const app = ()=>{
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const sounds = document.querySelectorAll('.sound-picker button')
    const video = document.querySelector('.vid-container video')
    const timeDisplay = document.querySelector('.time-display')   
    const outlineLength = outline.getTotalLength()
    const timeSelect = document.querySelectorAll('.time-select button')

    let duration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    sounds.forEach(sound=>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })

    play.addEventListener('click',()=>{
        checkPlaying(song)
    })

    timeSelect.forEach(option=>{
        option.addEventListener('click',function(){
            duration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(duration/60)}:${Math.floor(duration % 60)}`
        })
    })

    const checkPlaying = song =>{
        if(song.paused){
            song.play()
            video.play()
            play.src = "pause.svg"
        }else{
            song.pause()
            video.pause()
            play.src = 'play.svg'
        }
    }
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime
        let elpased = duration - currentTime
        let seconds = Math.floor(elpased % 60)
        let minutes = Math.floor(elpased /60)

        let progress = outlineLength - (currentTime/duration) * outlineLength
        outline.style.strokeDashoffset = progress

        timeDisplay.textContent = `${minutes}:${seconds}`

        if(currentTime>=duration){
            song.pause()
            song.currentTime = 0
            play.src = 'play.svg'
            video.pause()
        } 
    }
}

app()