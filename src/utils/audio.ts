/**
 * Web Audio API Heartbeat Synthesizer
 * Synthesizes realistic thudding heartbeat sound effects on-the-fly.
 */
export class HeartbeatSynth {
  private ctx: AudioContext | null = null;
  private intervalId: any = null;
  private bpm: number = 60;
  private isMuted: boolean = false;

  constructor() {}

  /**
   * Start the heartbeat rhythm
   */
  start(initialBpm: number = 60) {
    this.bpm = initialBpm;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
    
    this.playBeat();
    this.scheduleNextBeat();
  }

  /**
   * Dynamically adjust the heartbeat speed (beats per minute)
   */
  setBpm(newBpm: number) {
    this.bpm = newBpm;
  }

  /**
   * Toggle mute state
   */
  setMute(mute: boolean) {
    this.isMuted = mute;
  }

  private scheduleNextBeat() {
    // Standard heartbeat interval in milliseconds based on BPM
    const delay = (60 / this.bpm) * 1000;
    this.intervalId = setTimeout(() => {
      this.playBeat();
      this.scheduleNextBeat();
    }, delay);
  }

  private playBeat() {
    if (this.isMuted) return;
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      
      // 1. "Lub" - First deep thud (lower pitch, slightly longer duration)
      this.triggerThud({
        time: now,
        gainValue: 0.9,
        startFreq: 58,
        endFreq: 0.01,
        duration: 0.16,
      });
      
      // 2. "Dub" - Second thud (slightly higher pitch, slightly quieter, starts 140ms later)
      this.triggerThud({
        time: now + 0.14,
        gainValue: 0.6,
        startFreq: 62,
        endFreq: 0.01,
        duration: 0.12,
      });
    } catch (error) {
      console.warn("Heartbeat synthesizer failed to play beat:", error);
    }
  }

  private triggerThud(config: {
    time: number;
    gainValue: number;
    startFreq: number;
    endFreq: number;
    duration: number;
  }) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const lowpass = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.ctx.destination);

    // Deep sine wave
    osc.type = "sine";
    
    // Low pass filter to remove harsh clicking and create a muffled body thud
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(120, config.time);

    // Pitch envelope (sweep down to create the physical impact thud)
    osc.frequency.setValueAtTime(config.startFreq, config.time);
    osc.frequency.exponentialRampToValueAtTime(config.endFreq, config.time + config.duration);

    // Gain envelope (smooth fade-in and exponential fade-out)
    gain.gain.setValueAtTime(0, config.time);
    gain.gain.linearRampToValueAtTime(config.gainValue * 0.7, config.time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, config.time + config.duration);

    osc.start(config.time);
    osc.stop(config.time + config.duration);
  }

  /**
   * Plays a subtle, scary synthetic female scream/gasp when the result is revealed.
   * Utilizes multiple oscillators for vocal formants, FM rapid vibrato, and band-passed noise.
   */
  playSpookySound() {
    if (this.isMuted) return;
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const duration = 1.4; // Shorter scream duration for subtlety

      // Master gain node - specifically tuned to make it small and subtle but audible
      const masterGain = this.ctx.createGain();
      masterGain.connect(this.ctx.destination);
      
      // Volume envelope: very quick attack (gasp), brief hold, and natural horror decay
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.22, now + 0.06); // Increased maximum volume for better audibility
      masterGain.gain.setValueAtTime(0.22, now + 0.35);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Main vocal formant filter (bandpass isolates typical screaming voice frequencies)
      const voiceFilter = this.ctx.createBiquadFilter();
      voiceFilter.type = "bandpass";
      voiceFilter.frequency.setValueAtTime(1400, now);
      voiceFilter.Q.setValueAtTime(1.2, now);
      voiceFilter.connect(masterGain);

      // --- 1. Primary Female Vocal Pitch (F0: high-mid feminine range) ---
      const f0 = this.ctx.createOscillator();
      f0.type = "sawtooth"; // Rich screaming vocal timbre
      f0.frequency.setValueAtTime(620, now); // Starts around 620Hz
      f0.frequency.exponentialRampToValueAtTime(1080, now + 0.14); // Quick upward terror pitch bend
      f0.frequency.linearRampToValueAtTime(950, now + 0.5); // Hold pitch
      f0.frequency.exponentialRampToValueAtTime(450, now + duration); // Wear off into a heavy gasp

      // Vibrato LFO - rapid tremor to simulate raw panic and vocal cord tension
      const vibratoLfo = this.ctx.createOscillator();
      vibratoLfo.frequency.setValueAtTime(19, now); // 19Hz intense shiver
      const vibratoGain = this.ctx.createGain();
      vibratoGain.gain.setValueAtTime(55, now); // Modulate pitch up and down by 55Hz
      
      vibratoLfo.connect(vibratoGain);
      vibratoGain.connect(f0.frequency);

      // --- 2. Shrill Overtone (F1: high screaming formant) ---
      const f1 = this.ctx.createOscillator();
      f1.type = "triangle"; // Slightly smoother but bright
      f1.frequency.setValueAtTime(1240, now);
      f1.frequency.exponentialRampToValueAtTime(2160, now + 0.14);
      f1.frequency.linearRampToValueAtTime(1900, now + 0.5);
      f1.frequency.exponentialRampToValueAtTime(900, now + duration);
      vibratoGain.connect(f1.frequency); // Synchronized shaking

      // --- 3. Shivering Ghost Air (White noise for breathiness/raspiness of the scream) ---
      const bufferSize = this.ctx.sampleRate * duration;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // Bandpass filter to isolate high-frequency breath/gasp
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(2200, now);
      noiseFilter.Q.setValueAtTime(1.0, now);
      noiseFilter.connect(masterGain);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.10, now); // Increased air noise level for clearer gasp texture
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      noiseSource.connect(noiseGain);
      noiseGain.connect(noiseFilter);

      // Connect pitch oscillators to the main vocal filter
      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.30, now); // Boosted core vocal oscillators for high clarity
      f0.connect(oscGain);
      f1.connect(oscGain);
      oscGain.connect(voiceFilter);

      // Launch all components
      vibratoLfo.start(now);
      f0.start(now);
      f1.start(now);
      noiseSource.start(now);

      // Safely schedule stop and release
      vibratoLfo.stop(now + duration);
      f0.stop(now + duration);
      f1.stop(now + duration);
      noiseSource.stop(now + duration);
    } catch (e) {
      console.warn("Spooky scream sound synthesis failed:", e);
    }
  }

  /**
   * Stop the heartbeat synthesis entirely
   */
  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}
