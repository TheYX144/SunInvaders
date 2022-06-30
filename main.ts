namespace SpriteKind {
    export const floor = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    sprite.startEffect(effects.disintegrate)
})
function makeInvaders () {
    invaders = sprites.createProjectileFromSide(list[randint(0, 2)], 0, 50)
    invaders.setPosition(randint(10, 150), 0)
    invaders.setKind(SpriteKind.Enemy)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SleepTravler, 0, -50)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
})
function MakeSleepTraveler () {
    SleepTravler = sprites.create(img`
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c b . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . c 4 . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . e 4 . . . . . . . 
        . . . . . . e e 5 2 . . . . . . 
        . . . . . . e 4 5 2 . . . . . . 
        . . . . . c c c 2 2 2 . . . . . 
        . . . . e e 4 4 4 5 2 2 . . . . 
        . . e f f f c c 2 2 f f 2 2 . . 
        . e e e e 2 2 4 4 4 4 5 4 2 2 . 
        e e e e e e 2 2 4 4 4 5 4 4 2 2 
        e e e e e e 2 2 4 4 4 4 5 4 2 2 
        `, SpriteKind.Player)
    controller.moveSprite(SleepTravler, 100, 0)
    SleepTravler.setStayInScreen(true)
    SleepTravler.bottom = 120
}
function makeBottomWall () {
    bottomWall = sprites.create(assets.image`myImage`, SpriteKind.floor)
    scaling.scaleToPixels(bottomWall, 160, ScaleDirection.Horizontally, ScaleAnchor.Middle)
    bottomWall.bottom = 120
}
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.spray, 200)
    info.changeScoreBy(1)
})
let bottomWall: Sprite = null
let SleepTravler: Sprite = null
let projectile: Sprite = null
let invaders: Sprite = null
let list: Image[] = []
MakeSleepTraveler()
scene.setBackgroundColor(5)
list = [img`
    . . . . . . 7 7 7 . . . . . . . 
    . . . . . 7 7 7 7 7 . . . . . . 
    . . . . . 7 f 1 7 1 f . . . . . 
    . . . . . 7 f 1 7 1 f . . . . . 
    . . . . . 7 7 7 7 7 7 . . . . . 
    . . . . . . f 7 7 f . . . . . . 
    . . . . . . 7 f f . . . . . . . 
    . . . . . . . 7 . . . . . . . . 
    . . . . . 7 9 9 9 . . . . . . . 
    . . . 7 7 7 9 9 9 7 7 . . . . . 
    . . . 7 . 9 9 9 9 . 7 7 7 . . . 
    . . . 7 . 9 9 9 9 . . . 7 . . . 
    . . . . . . 9 9 . . . . 2 . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . . 6 6 . . 6 . . . . . . 
    . . . . . 6 . . . 6 6 . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . 9 9 a c 6 6 c 9 . . . . 
    . . . c c 6 6 6 c a 8 9 9 . . . 
    . . . 9 a c 6 6 8 8 8 c 9 . . . 
    . . . 9 8 8 8 c 8 6 9 9 9 9 . 3 
    . . . 9 9 a 8 a 8 6 9 . . 3 3 . 
    . . . . 9 c 9 a 8 9 c . . . . . 
    . . . . 9 . 9 9 9 9 9 9 . . . . 
    3 . . 9 9 . 9 . . . . 9 9 3 3 3 
    3 3 . 9 . . 9 . . . . . . . . . 
    . 9 9 . . . 9 9 . . . 3 . . . . 
    . . . . . . . 9 9 9 3 3 . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 1 
    f f f . . . . . . . . . . . . 1 
    . . f f f f 1 1 1 . . . . . 1 f 
    . . . . 1 f f f f f 1 1 . . 1 f 
    . . . . 1 1 1 1 1 f f 1 1 . 1 f 
    . . . f f f f 1 1 1 f 1 1 f f f 
    . . . f 1 1 f f 1 f f f f f . . 
    . . . . 1 1 1 f f f f 1 1 . . . 
    . . . . 1 f f f f f f f f . . . 
    . . . . 1 f 1 1 f 1 f f 1 . . . 
    . . . . . f 1 1 f f 1 f 1 . . . 
    . . . . f . . . 1 f 1 f . . . . 
    . . . 1 f . . . . . . f 1 . . . 
    . . f f . . . . . . . f f f . . 
    . . 1 . . . . . . . . 1 2 f f f 
    `]
info.setLife(3)
makeBottomWall()
info.startCountdown(120)
game.onUpdateInterval(1500, function () {
    makeInvaders()
    invaders.setFlag(SpriteFlag.AutoDestroy, true)
})
