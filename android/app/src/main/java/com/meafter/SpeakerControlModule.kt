package com.meafter

import android.content.Context
import android.media.AudioManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SpeakerControlModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    private val audioManager: AudioManager =
            reactContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager

    override fun getName(): String {
        return "SpeakerControl"
    }

    /**
     * Enable or disable the speaker.
     * @param enable - true to enable the speaker, false to disable it.
     */
    @ReactMethod
    fun setSpeaker(enable: Boolean, promise: Promise) {
        try {
            audioManager.isSpeakerphoneOn = enable
            promise.resolve("Speakerphone is now ${if (enable) "enabled" else "disabled"}")
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to change speakerphone state", e)
        }
    }
}
