class KoekkenNinjaGame extends Game {
    constructor(player_id) {
        this.player_id = player_id
        this.fruits_hit = 0
    }
}

window.Game = new Game()