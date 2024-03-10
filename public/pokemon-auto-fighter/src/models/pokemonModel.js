// PokemonModel.js
class Pokemon {
    constructor(id, name, type1, type2, hp, maxHp, attack, defence, specialAttack, specialDefence, speed, experience, rarity, frontSprite, backSprite) {
        this.id = id;
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.hp = hp;
        this.maxHp = maxHp;
        this.attack = attack;
        this.defence = defence;
        this.specialAttack = specialAttack;
        this.specialDefence = specialDefence;
        this.speed = speed;
        this.experience = experience;
        this.rarity = rarity;
        this.frontSprite = frontSprite;
        this.backSprite = backSprite;
    }
}

export default Pokemon;
