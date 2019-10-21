const game = {
    game: {
        id: 1,
        activePlayers: 2,
        players: [
            {
                id: 1,
                team: 1,
                lifePoints: 4000,
                hand: [
                    {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false,
                        isAttack: false
                    }
                ],
                deck: [
                    {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false,
                        isAttack: false
                    }
                ],
                graveyard: [
                    {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false,
                        isAttack: false
                    }
                ],
                magicOrTrapSlots: [
                    {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false
                    }
                ],
                monsterSlot: [
                    {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false,
                        isAttack: false
                    }
                ],
                fieldCardsSlot: {
                    card: {
                        id: "91740879",
                        name: "Cauldron of the Old Man",
                        type: "Spell Card",
                        desc: "When this card is activated: Place 1 counter on this card. Once per turn, during your Standby Phase: Place 1 counter on this card. Once per turn: You can activate 1 of these effects;\r\n● Gain 500 LP for each counter on this card.\r\n● Inflict 300 damage to your opponent for each counter on this card.",
                        image_url: "https://storage.googleapis.com/ygoprodeck.com/pics/91740879.jpg",
                        race: "Continuous",
                        publicPreview: false,
                        faceUp: false
                    }
                }
            }
        ]
    }
};


$('.card-slot img').on('click', function () {
    $(this).parent().toggleClass("card-slot--defense");
});

$('.card-slot--hidden').off().on('click', function () {
    $(this).toggleClass("card-slot--defense");
});


const yugioh = {
    playerId: 0,
    db: null,
    dbRef: null,
    gameRef: null,
    playerRef: null,
    playerLifePointsRef: null,
    handRef: null,
    deckRef: null,
    graveyardRef: null,
    fieldMonstersRef: null,
    fieldMagicTrapRef: null,
    fieldEffectCardsRef: null,
    init: function () {
        this.cacheDOM();
        this.bindEvents();
        this.startNewGame()
    },
    startFirebase: function (playerId) {
        this.gameRef = this.db.ref("game");
        this.playerRef = this.db.ref("game/players/player/" + playerId);
        this.playerLifePointsRef = this.db.ref("game/players/player/" + playerId + "/lifePoints");
        this.handRef = this.db.ref("game/players/player/" + playerId + "/hand");
        this.graveyardRef = this.db.ref("game/players/player/" + playerId + "/graveyard");
        this.deckRef = this.db.ref("game/players/player/" + playerId + "/deck");
        this.fieldMagicTrapRef = this.db.ref("game/players/player/" + playerId + "/magicOrTrapSlots");
        this.fieldMonstersRef = this.db.ref("game/players/player/" + playerId + "/monsterSlot");
        this.fieldEffectCardsRef = this.db.ref("game/players/player/" + playerId + "/fieldCardsSlot");

        // dbRef.once("value").then(
        //     function (res) {
        //         console.log(res.val());
        //     }
        // );
        //
        // game.players.activePlayers = 3;
        // game.players.player[0].hand[0].card.faceUp = true;
        // dbRef.set(game);
    },
    cacheDOM: function () {
        this.rotators = Array.from(document.getElementsByClassName("field__rotator"));
    },
    bindEvents: function () {
        this.bindRotators();
    },
    bindRotators: function () {
        this.rotators.forEach(function (el, i) {
            el.addEventListener("click", function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                yugioh.rotatePlayerField(el)
            });
        });
    },
    startNewGame: function () {
        this.db = firebase.database();
        this.dbRef = this.db.ref();
        this.dbRef.set(game);
        this.startFirebase(this.playerId)
    },
    rotatePlayerField: function (el) {
        const target = el.dataset['target'];
        const rotation = parseInt(el.dataset['rotation'], 10);
        console.log(el, target, rotation);
        document.getElementsByClassName(target)[0].style.transform = 'rotate(' + rotation + 'deg)';
        el.dataset['rotation'] = rotation + 180
    },
    addLifePoints: function () {
    },
    removeLifePoints: function () {
    },
    drawCard: function (deckId) {
    },
    drawSpecificCard: function (cardId, deckId) {
    },
    sendCardToGraveyard: function (cardId) {
    },
    setAttackingCard: function (cardId) {
    },
    changeCardToAttack: function (cardId) {
    },
    changeCardToDefense: function (cardId) {
    },
    setDefenseCardUp: function (cardId) {
    },
    setDefenseCardDown: function (cardId) {
    },
    flipDefenseCard: function (cardId) {
    },
    setMagicTrapCardUp: function (cardId) {
    },
    setMagicTrapDown: function (cardId) {
    },
    setFieldCard: function (cardId) {
    },
    shuffleDeck: function (deckId) {
    },
    resurrectCard: function (cardId, toHand) {
    },
    exchangeCard: function (cardSrcId, cardDescId, playerId) {
    },

};

yugioh.init();
