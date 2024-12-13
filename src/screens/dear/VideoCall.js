//#region import
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  NativeModules,
  Platform,
  Image,
  PermissionsAndroid,
} from 'react-native';
//lib
import {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';
import {HubConnectionBuilder} from '@microsoft/signalr';
import 'react-native-url-polyfill/auto';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

//baseComp
import FontIcons from '../../components/baseComp/FontIcons';
//utils
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';
import {showMsgAlert} from '../../utils/Alert';
import {videoCallFormatTime} from '../../utils/DateTimeUtil';
// Access the Native Module
const {SpeakerControl} = NativeModules;
//const
const configuration = {
  iceServers: [
    {url: 'stun:stun.l.google.com:19302'},
    {
      urls: 'turn:relay3.expressturn.com:3478',
      username: 'efX63OUOUIHN14BZAM',
      credential: 'tqmT3ragaCLnwPiT',
    },
  ],
};
const AudioRecorderPlayerInstance = new AudioRecorderPlayer();
//assets
const ic_mic = require('../../assets/images/videoCall/ic_mic.png');
//#endregion

//#region Main
export default function VideoCall({navigation, route}) {
  const SIGNALING_SERVER_URL = `https://b13a-103-98-189-138.ngrok-free.app/signalingHub?userName=xyzysy`;

  //#region useState
  const [callTime, setCallTime] = useState(0); // Example call timer
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isStartRecord, setIsStartRecord] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  //#endregion

  //#region useRef
  const peerConnection = useRef(null);
  const singnalrConnection = useRef(null);

  //#endregion
  //#region useEffect

  // Use useEffect to start and stop the timer
  useEffect(() => {
    let timer;

    if (remoteStream) {
      // Start the timer when the call begins (i.e., remote stream is available)
      timer = setInterval(() => {
        setCallTime(prevTime => prevTime + 1); // Increment call time by 1 second
      }, 1000);
    }

    return () => {
      // Clean up the timer when the component unmounts or when the call ends
      clearInterval(timer);
    };
  }, [remoteStream]); // Trigger the effect when remoteStream is available

  // Setup signaling server connection
  useEffect(() => {
    const setupConnection = async () => {
      try {
        singnalrConnection.current = new HubConnectionBuilder()
          .withUrl(SIGNALING_SERVER_URL)
          .build();
        await singnalrConnection.current.start();
        console.log('singnalrConnection:1.1 Connected to signaling server');
        //connecting.current = true;

        singnalrConnection.current.on('OnConnected', OnConnected => {
          console.log('singnalrConnection:1.2 OnConnected ' + OnConnected);
          setupWebrtc();
        });

        singnalrConnection.current.on('ReceiveAnswer', async answer => {
          console.log(
            'singnalrConnection:1.3-->> ReceiveAnswer ' +
              JSON.stringify(answer),
          );

          await handleAnswer(answer);
        });

        singnalrConnection.current.on(
          'ReceiveIceCandidate',
          async candidate => {
            console.log(
              'singnalrConnection:1.4-->> ReceiveIceCandidate ' +
                JSON.stringify(candidate),
            );

            await handleCandidate(candidate);
          },
        );

        singnalrConnection.current.onclose(error => {
          console.error('SignalR connection closed:', error);
          console.log(
            'singnalrConnection:1.5-->> SignalR connection closed ' +
              JSON.stringify(error),
          );
          setTimeout(() => setupConnection(), 5000); // Attempt to reconnect
        });
      } catch (connectionError) {
        showMsgAlert(
          connectionError.toString(),
          'Error initializing SignalR connection',
        );
        console.log(
          'singnalrConnection:1.6-->> Error initializing SignalR connection ' +
            JSON.stringify(connectionError.toString()),
        );

        setTimeout(() => setupConnection(), 5000); // Retry after delay
      }
    };

    setupConnection();

    return () => {
      if (singnalrConnection.current) {
        singnalrConnection.current
          .stop()
          .then(() => {
            console.log('SignalR connection stopped');
          })
          .catch(stopError => {
            console.error('Error stopping SignalR connection:', stopError);
          });
      }
    };
  }, []);

  //#endregion
  //#region Action

  const endCall = async () => {
    singnalrConnection.current = false;
    streamCleanUp();
    if (peerConnection.current) {
      peerConnection.current.close();
    }
  };

  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  //#endregion

  const enableAndroidNativeSpeaker = () => {
    SpeakerControl.setSpeaker(true)
      .then(message => {
        console.log('Speaker enabled successfully:', message);
      })
      .catch(error => {
        console.error('Error enabling speaker:', error);
        showMsgAlert('Error enabling speaker:', error);
      });
  };

  //#region WebRTC

  // Setup the WebRTC peer connection
  const setupWebrtc = async () => {
    peerConnection.current = new RTCPeerConnection(configuration);
    //const stream = await Utils.getStream();
    const stream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (stream) {
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        console.log(`Track Kind: ${track.kind}, Enabled: ${track.enabled}`);
        peerConnection.current.addTrack(track, stream);
      });

      if (Platform.OS === 'android') {
        enableAndroidNativeSpeaker();
      }
      // Call the createOffer function after 2.5 seconds
      setTimeout(() => {
        createOffer();
      }, 2500);
    } else {
      showMsgAlert(
        'Error: Could not access the camera or microphone. Please ensure permissions are granted and try again.',
      );
    }

    peerConnection.current.ontrack = event => {
      //console.log('Received ontrack event:', JSON.stringify(event));

      if (event.streams && event.streams[0]) {
        // console.log('Stream detected:', event.streams[0].toURL());
        // Store the remote stream temporarily in ref
        setRemoteStream(event.streams[0]);
      } else {
        showMsgAlert('Error during get on track');
      }

      // Start monitoring stats
      monitorStats();
    };

    peerConnection.current.onconnectionstatechange = event => {
      console.log(
        'WebRtc connection status onconnectionstatechange ---->>' +
          JSON.stringify(peerConnection.current.connectionState),
      );
    };
  };

  // Create and send an offer to the peer
  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();
    offer.sdp = offer.sdp.replace('H264', 'VP8'); // Replace H264  with VP8 for compatibility

    await peerConnection.current.setLocalDescription(offer);

    sendIceCandidate(singnalrConnection.current?.connection?.connectionId);

    sendSignal(
      'SendOffer',
      offer,
      singnalrConnection.current?.connection?.connectionId,
    );

    console.log('WebRTcLog:1.1-->> Offer Sent');
  };

  // Handle the answer from the remote peer
  const handleAnswer = async answer => {
    try {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
      console.log('WebRTcLog:1.2-->> Answer Accept');
    } catch (error) {
      console.error('WebRTcLog:1.3-->> Failed to set Answer' + error);

      showMsgAlert(error.toString(), 'handle answer error');
    }
  };

  // Handle ICE candidate from the remote peer
  const handleCandidate = async candidate => {
    await peerConnection.current.addIceCandidate(
      new RTCIceCandidate(candidate),
    );

    console.log('WebRTcLog:1.4-->> ICE Candidate added');
  };

  // Send ICE candidates to the signaling server
  const sendIceCandidate = async connectionId => {
    if (peerConnection.current) {
      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          const modifiedObject = {
            ...event.candidate, // copy the other properties
            candidate: event.candidate.candidate
              .replace('candidate:', '')
              .trim(), // remove "candidate:" and trim any extra spaces
          };
          sendSignal('SendIceCandidate', modifiedObject, connectionId);
        }
      };
    }
  };

  // Send signaling data (offer, answer, ICE candidates)
  const sendSignal = async (actionType, payload, connectionId) => {
    console.log('payload:-------->>' + JSON.stringify(payload));
    console.log('type-------->> ' + JSON.stringify(actionType));

    console.log('connectionId -------->>' + JSON.stringify(connectionId));
    try {
      if (singnalrConnection.current?.connection?._connectionStarted) {
        await singnalrConnection.current.invoke(
          actionType,
          JSON.stringify(payload),
          connectionId,
        );
        console.log(`---------Signal sent:------------->> ${actionType}`);
      } else {
        showMsgAlert('Not connected to signaling server');
      }
    } catch (error) {
      console.error('Error sending signal:', error);
      showMsgAlert('Error sending signal');
    }
  };

  //#endregion

  const monitorStats = () => {
    if (!peerConnection.current) return;

    const intervalId = setInterval(() => {
      peerConnection.current.getStats(null).then(statsReport => {
        statsReport.forEach(report => {
          // console.log('report-------' + JSON.stringify(report));
          //con
          if (report.type === 'inbound-rtp' && report.kind === 'video') {
            console.log(`Inbound Video Stats:
              Received Bytes: ${report.bytesReceived}
              Packets Lost: ${report.packetsLost}
              Frames Decoded: ${report.framesDecoded}`);
          }

          // if (report.type === 'outbound-rtp' && report.kind === 'video') {
          //   const sentBytes = report.bytesSent;
          //   const framesEncoded = report.framesEncoded;

          //   console.log('Outbound Video Stats:');
          //   console.log(`Sent Video Bitrate: ${sentBytes}`);
          //   console.log(`Frames Sent: ${framesEncoded}`);
          // }

          if (report.type === 'inbound-rtp' && report.kind === 'audio') {
            console.log(`Inbound Audio Stats:
              Received Bytes: ${report.bytesReceived}
              Packets Lost: ${report.packetsLost}
              Audio Level: ${report.audioLevel}`); // audioLevel may be present
          }

          // // Monitor outbound audio
          // if (report.type === 'outbound-rtp' && report.kind === 'audio') {
          //   console.log(`Outbound Audio Stats:
          //     Sent Bytes: ${report.bytesSent}
          //     Packets Lost: ${report.packetsLost}`);
          // }
        });
      });
    }, 5000); // Poll every 5 seconds

    // Cleanup interval when peerConnection is closed
    return () => clearInterval(intervalId);
  };

  //#region JSX

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      const storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        storageGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permission granted');
        return true;
      } else {
        console.log('Permission denied');
        return false;
      }
    }
    return true; // iOS does not need runtime permissions for these
  };

  const SwipeCamera = () => {
    const switchCamera = async () => {
      if (localStream) {
        // Stop the current tracks
        localStream.getTracks().forEach(track => track.stop());
      }

      try {
        // Toggle camera direction
        const newFacingMode = isFrontCamera ? 'environment' : 'user';
        setIsFrontCamera(!isFrontCamera);

        // Get a new media stream with the updated camera direction
        const newStream = await mediaDevices.getUserMedia({
          video: {facingMode: newFacingMode},
          audio: true,
        });

        // Replace the existing video track in the peer connection
        const videoTrack = newStream.getVideoTracks()[0];
        const sender = peerConnection.current
          .getSenders()
          .find(s => s.track && s.track.kind === 'video');
        if (sender) {
          sender.replaceTrack(videoTrack);
        }

        // Update the local stream
        setLocalStream(newStream);
      } catch (error) {
        console.error('Error switching camera:', error);
        showMsgAlert('Error switching camera: ' + error.message);
      }
    };

    return (
      <TouchableOpacity style={styles.cameraView} onPress={switchCamera}>
        <FontIcons
          color={appColors.appBlackTitleTxt}
          name={'camera-switch'}
          size={scaleXiPhone15.twentyH}
        />
      </TouchableOpacity>
    );
  };

  const AudioRecord = () => {
    const startRecording = async () => {
      const isPermissionGranted = await requestPermissions();
      if (!isPermissionGranted) {
        return;
      }
      const path = `${RNFS.DocumentDirectoryPath}/test.wav`; // Use app's private storage

      try {
        await AudioRecorderPlayerInstance.startRecorder(path);
        setIsStartRecord(true);
        setAudioPath(path);
      } catch (err) {
        console.error('Error starting recording:', err);
      }
    };

    const stopRecording = async () => {
      try {
        await AudioRecorderPlayerInstance.stopRecorder();
        setIsStartRecord(false);
      } catch (err) {
        console.error('Error stopping recording:', err);
      }

      try {
        // Read the file and convert to base64
        const base64Data = await RNFS.readFile(audioPath, 'base64');
        sendSignal(
          'SendAudioStream',
          base64Data,
          singnalrConnection.current?.connection?.connectionId,
        );
      } catch (error) {
        console.error('Error converting audio to Base64:', error);
      }
    };

    return (
      <TouchableOpacity
        style={isStartRecord ? styles.micRedBgBtn : styles.micWhiteBgBtn}
        onPress={isStartRecord ? stopRecording : startRecording}>
        <Image
          source={ic_mic}
          tintColor={
            isStartRecord ? appColors.appWhiteTxtInpt : appColors.appBlackBtn
          }
          resizeMode="cover" // Adjusts how the image fits in the container
        />
      </TouchableOpacity>
    );
  };
  //#endregion

  return (
    <View style={styles.safearea}>
      {/* Full-Screen Video */}

      {localStream && (
        <RTCView
          streamURL={
            remoteStream ? remoteStream?.toURL() : localStream?.toURL()
          }
          style={styles.fullScreenVideo}
          objectFit="cover"
        />
      )}

      {/* User's Self-View */}

      {remoteStream && (
        <RTCView
          streamURL={localStream?.toURL()}
          style={styles.selfView}
          objectFit="cover"
        />
      )}

      {/* Call Details */}
      <View style={styles.callDetails}>
        <Text style={styles.participantName}>Morty Smith</Text>
        <Text style={styles.callTimer}>
          {callTime > 0 ? videoCallFormatTime(callTime) : 'Calling...'}
        </Text>
      </View>

      {/* SwipeCamera */}
      {remoteStream && <SwipeCamera />}

      {remoteStream && <AudioRecord />}

      {/* End Call Button */}
      <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
        <FontIcons
          color={appColors.appWhiteTxtInpt}
          name={'phone'}
          size={scaleXiPhone15.twentyEightH}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: appColors.appWhitePageBg,
  },

  fullScreenVideo: {
    flex: 1,
  },
  selfView: {
    position: 'absolute',
    width: scaleXiPhone15.hundredH,
    height: scaleXiPhone15.hundredFiftyH,
    bottom: scaleXiPhone15.twelveH,
    right: scaleXiPhone15.twelveH,
    borderWidth: scaleXiPhone15.twoH,
    borderColor: appColors.appGrayBorder,
    borderRadius: scaleXiPhone15.tenH,
    backgroundColor: 'red',
  },
  callDetails: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: scaleXiPhone15.fivtyH,
    // left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: scaleXiPhone15.tenH,
    borderRadius: scaleXiPhone15.eightH,
  },
  participantName: {
    fontSize: scaleXiPhone15.eightteenH,
    fontFamily: appFonts.bold,
    color: appColors.appWhiteTxtInpt,
  },
  callTimer: {
    paddingVertical: scaleXiPhone15.eightH,
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.bold,

    color: appColors.appWhiteTxtInpt,
  },
  endCallButton: {
    position: 'absolute',
    bottom: scaleXiPhone15.twentyH,
    alignSelf: 'center',
    backgroundColor: appColors.appRed,
    width: scaleXiPhone15.ninetyFourH,
    height: scaleXiPhone15.ninetyFourH,
    borderRadius: scaleXiPhone15.ninetyFourH * 0.5,
    borderWidth: scaleXiPhone15.tenH,
    borderColor: 'rgb(115,76,75)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '135deg'}], // Rotate the icon by 45 degrees
  },

  micRedBgBtn: {
    position: 'absolute',
    bottom: scaleXiPhone15.hundredFiftyH,
    alignSelf: 'center',
    backgroundColor: appColors.appRed,
    width: scaleXiPhone15.ninetyFourH,
    height: scaleXiPhone15.ninetyFourH,
    borderRadius: scaleXiPhone15.ninetyFourH * 0.5,
    borderWidth: scaleXiPhone15.tenH,
    borderColor: 'rgb(115,76,75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  micWhiteBgBtn: {
    position: 'absolute',
    bottom: scaleXiPhone15.hundredFiftyH,
    alignSelf: 'center',
    backgroundColor: appColors.appWhiteTxtInpt,
    width: scaleXiPhone15.eightyH,
    height: scaleXiPhone15.eightyH,
    borderRadius: scaleXiPhone15.eightyH * 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraView: {
    position: 'absolute',

    right: scaleXiPhone15.sixteenH,
    height: scaleXiPhone15.fortyH,
    width: scaleXiPhone15.fortyH,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    top: scaleXiPhone15.fivtyH,
    // left: 20,
    backgroundColor: appColors.appWhiteTxtInpt,
    borderRadius: scaleXiPhone15.fortyH * 0.5,
  },
});
//#endregion
