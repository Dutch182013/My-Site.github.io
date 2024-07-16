function animedelay(frame, s, func) {
    window.onload = function() {
        setInterval(func, 1000 / frame * s)
    }
}

class DrawTag {
    constructor(tag_idname) {
        this.tagname = document.getElementById(tag_idname);
        this.datanum = ['0','1','2','3','4','5','6','7','8','9']
    }

    pack(data, tag) {
        return `<${tag}> ${data} </${tag}>`
    }

    rand(min, max) {
        return Math.floor(Math.random() * max) +min
    }

    length_rand() {
        return this.datanum[this.rand(0, this.datanum.length)]
    }

    create(number) {
        let datastr = ''
        for (let i = 0; i < number; i++) {
            datastr += this.length_rand()
        }
        return datastr
    }

    draw() {
        this.tagname.innerHTML = this.pack(this.create(6), 'i')
    }
}

var drawtag = new DrawTag('drawtagi');

animedelay(1, 1, function() {
    drawtag.draw();
})