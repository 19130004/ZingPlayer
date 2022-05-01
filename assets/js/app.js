const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playistList = $('.playist-list');
const player = $('.main-bar');
const playBtn = $('.play-pause');
const audio = $('#audio');
const heading = $('.music-textname h5');
const singer = $('.music-textname p');
const cdThumb = $('.music-img');
const prevBtn = $('.music-icon .fa-step-backward')
const nextBtn = $('.music-icon .fa-step-forward')
const progress = $('.progress-bar')
const progressArea = $('.progress-area')
const randomBtn = $('.music-icon .fa-random')
const loopBtn = $('.music-icon .fa-redo')
const volumBtn = $('.volum')
const volumArea = $('.volumbox')
const volumArea2 = $('.volumbox.mute')
const volumUp = $('.volumbox .fa-volume-up')
const volumMute = $('.volumbox .fa-volume-mute')
const tabNav = $$('.navbar-link');
const tabLists = $$('.tablist');

tabNav.forEach((tab, index) => {
    const tabList = tabLists[index];
    tab.onclick = function () {
        $('.navbar-link.active').classList.remove('active');
        $('.tablist.active').classList.remove('active');
        this.classList.add('active');
        tabList.classList.add('active');
    }
})
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Đi về nhà',
            singer: 'Đen, Justatee',
            path: './assets/song/1.mp3',
            img: 'https://i1.sndcdn.com/artworks-4uzPxyIN5YK7qzum-k7v73Q-t500x500.jpg',

        },
        {
            name: 'Cơn mưa cuối',
            singer: 'Justatee , Binz',
            path: './assets/song/2.mp3',
            img: 'https://i1.sndcdn.com/artworks-000191567152-6ogpm0-t500x500.jpg',

        },
        {
            name: 'Buồn thì cứ khóc đi',
            singer: 'Lynk Lee',
            path: './assets/song/3.mp3',
            img: 'https://i1.sndcdn.com/artworks-000654140140-ak64cl-t500x500.jpg',

        },
        {
            name: 'Hãy trao cho anh',
            singer: 'Sơn Tùng M-TP ft. Snoop Dog',
            path: './assets/song/4.mp3',
            img: 'https://i1.sndcdn.com/artworks-000560564931-xhi71x-t500x500.jpg',

        },
        {
            name: 'Tình bạn diệu kỳ',
            singer: 'Amee x Ricky Star x Lăng LD',
            path: './assets/song/5.mp3',
            img: 'https://i1.sndcdn.com/artworks-RTiANfFoNu6cpYyv-yAp1xA-t500x500.jpg',

        },
        {
            name: 'Trên Tình Bạn Dưới Tình Yêu',
            singer: 'MIN',
            path: './assets/song/6.mp3',
            img: 'https://i1.sndcdn.com/artworks-Huuuiv5nP8Q26ygR-RJRiRA-t500x500.jpg',

        },
        {
            name: 'Sau Tất Cả (After All)',
            singer: 'ERIK ST.319',
            path: './assets/song/7.mp3',
            img: 'https://i1.sndcdn.com/artworks-000142745540-1mw8pg-t500x500.jpg',

        },
        {
            name: 'Stay',
            singer: 'The Kid LAROI, Justin Bieber',
            path: './assets/song/8.mp3',
            img: 'https://i1.sndcdn.com/artworks-OJlUwec0bqGd-0-t500x500.jpg',

        },
        {
            name: 'Let It Go',
            singer: 'Idina Menzel',
            path: './assets/song/9.mp3',
            img: 'https://i1.sndcdn.com/artworks-000067100191-lw0qld-t500x500.jpg',

        },
        {
            name: 'See You Again',
            singer: 'Wiz Khalifa ft. Charlie Puth Furious 7',
            path: './assets/song/10.mp3',
            img: 'https://i1.sndcdn.com/artworks-000114685101-17m6ca-t500x500.jpg',

        },
        {
            name: 'Scars To Your Beautiful',
            singer: 'Alessia Cara',
            path: './assets/song/11.mp3',
            img: 'https://i1.sndcdn.com/artworks-FX9IdYtt4PAA-0-t500x500.jpg',

        },
        {
            name: 'There’s No One At All',
            singer: 'Sơn Tùng M-TP',
            path: './assets/song/12.mp3',
            img: 'https://i.scdn.co/image/ab67616d00001e0248e90a4c48b31c66e8b0d24f',

        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="playist-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="media">
                <div class="media-left">
                    <div class="song-thumb">
                        <figure class="image is-40x40" title="Beginner">
                            <img src="${song.img}" alt="${song.name}">
                                alt="">
                        </figure>
                    </div>
                    <div class="card-info">
                        <div class="card-title">
                            <span class="card-song-title">
                                <span class="card-song-name">${song.name}</span>
                                <i
                                    class="card-song-icon fas fa-user-friends"></i>

                            </span>
                        </div>
                        <h3 class="song-artist">${song.singer}</h3>
                    </div>
                </div>
                <div class="media-content">

                </div>
                <div class="media-right">
                    <div class="media-action">
                        <div class="action-item action-heart">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="action-item song-time">
                            <span class="song-time-number"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>`
        });
        playistList.innerHTML = htmls.join('');

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function () {
        const _this = this;
        // Xoay CD
        var cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' },
        ]
            , {
                duration: 10000,
                iterations: Infinity,
            })
        // Play Music
        cdThumbAnimate.pause();
        playBtn.addEventListener('click', function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        })
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add("playing")
            // icon.classList.add("active5")
            cdThumbAnimate.play();

        }
        // Dừng Music
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove("playing")
            // icon.classList.remove("active5")
            cdThumbAnimate.pause();
        }
        // Tiến độ bài hát
        audio.addEventListener('timeupdate', function (e) {
            const currentTime = e.target.currentTime;
            const duration = e.target.duration;
            let progressWidth = (currentTime / duration) * 100;
            progress.style.width = progressWidth + "%";

            let musicCurrentTime = $(".current"),
                musicDuration = $(".duration");
            audio.addEventListener('loadeddata', function () {
                let mainAdDuration = audio.duration;
                let totalMin = Math.floor(mainAdDuration / 60);
                let totalSec = Math.floor(mainAdDuration % 60);
                if (totalSec < 10) {
                    totalSec = "0" + totalSec;
                }
                musicDuration.innerText = `${totalMin}:${totalSec}`;



            });
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if (currentSec < 10) {
                currentSec = "0" + currentSec;
            }
            musicCurrentTime.innerText = `${currentMin}:${currentSec}`;


        })
        // Xử lý tua bài hát
        progressArea.addEventListener('click', function (e) {
            let progressWidthVal = progressArea.clientWidth;
            // console.log(progressWidthVal)
            const clickedOffset = e.offsetX;
            let timeSong = audio.duration;
            audio.currentTime = (clickedOffset / progressWidthVal) * timeSong;
        })
        // Next Music
        nextBtn.addEventListener('click', function () {
            if (_this.isRandom) {
                _this.playRandomSong()
                audio.play()
            }
            else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.loadDurationSong(_this.songs)
            _this.scrollToActiveSong();
        })
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playrandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.loadDurationSong(_this.songs)
            _this.scrollToActiveSong();
        }
        randomBtn.addEventListener('click', function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active3', _this.isRandom)
        })
        // Repeat Music
        loopBtn.addEventListener('click', function () {
            _this.isRepeat = !_this.isRepeat;
            loopBtn.classList.toggle('active3', _this.isRepeat)
        })
        // Tự động next khi kết khúc bài bài hát
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }
        //  Xử lý khi nhấn vào playist
        playistList.onclick = function (e) {
            const songNode = e.target.closest('.playist-item:not(.active)');
            if (songNode) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    _this.loadDurationSong(_this.songs);
                    audio.play();

                }
            }
        }
        //volume
        volumBtn.onchange = function (e) {
            let currentValum = e.target.value
            audio.volume = currentValum / 100;
            if (currentValum == 0) {
                volumArea.classList.add('mute');
                volumBtn.value = 0;
            } else {
                volumArea.classList.remove('mute');
            }
        }
        volumUp.onclick = function () {
            // _this.isMute = !_this.isMute;
            let currentValum = volumBtn.value;
            currentValum = 0;
            audio.volume = currentValum;
            volumArea.classList.add('mute')
            volumBtn.value = 0;
            // randomBtn.classList.toggle("mute", _this.isMute);

        }
        volumMute.onclick = function () {
            volumArea.classList.remove('mute');
            volumBtn.value = 100;
            audio.volume = 1;
        }



    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    loadDurationSong: function (songs) {
        let listAu = document.getElementById('listAudio')
        let timeMusic = document.getElementsByClassName("song-time-number");
        for (let i = 0; i < timeMusic.length; i++) {
            let au = document.createElement('audio')
            au.src = songs[i].path;
            au.setAttribute("id", `au${i}`)
            listAu.appendChild(au);
            let timer = document.getElementById(`au${i}`)
            timer.addEventListener("loadeddata", () => {
                let mainAdDuration = timer.duration;
                let totalMin = Math.floor(mainAdDuration / 60);
                let totalSec = Math.floor(mainAdDuration % 60);
                if (totalSec < 10) {
                    totalSec = `0${totalSec}`;
                }
                timeMusic[i].innerText = `0${totalMin}:${totalSec}`;
            });
        }
        listAu.innerHTML = '';

    },
    scrollToActiveSong: function () {
        setTimeout(() => {

            $('.playist-item.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.loadDurationSong(this.songs);
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.loadDurationSong(this.songs);
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex) {
            this.currentIndex = newIndex;
            this.loadCurrentSong();
            this.loadDurationSong(this.songs);
        }
    },
    repeatSong: function () {
        if (this.isRandom) {
            this.playRandomSong();
        } else {
            this.loadCurrentSong();
            this.loadDurationSong(this.songs);
        }

    },
    start: function () {
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
        this.loadDurationSong(this.songs);
    }

}
app.start();

var searchInput = $('.search__container-input input');
searchInput.addEventListener('input', function (e) {
    let txtSearch = e.target.value.trim().toLowerCase();
    let listSongs = $$('.playist-item');
    listSongs.forEach(function (song) {
        if(song.innerText.toLowerCase().includes(txtSearch)){
            song.classList.remove('hide')
        }
        else{
            song.classList.add('hide')
        }
    })
})