from gtts import gTTS
import os #os.ststem(): to execute shell commands directly from your script 
audio=gTTS(text="Hello Developer, Welcome to OneTeam. How are you?",lang='en')
audio.save("text_audio.mp3")
os.system("start text_audio.mp3")