const imgs = document.querySelectorAll(".imagens-random")


function imgHover() {
    imgs.forEach((imgs) => {
        imgs.addEventListener("mouseover", () => {
            imgs.classList.add("hoverImg")
        })
        imgs.addEventListener("mouseout", () => {
            imgs.classList.remove("hoverImg")
            console.log(imgs)
        })
    })
}

imgHover()