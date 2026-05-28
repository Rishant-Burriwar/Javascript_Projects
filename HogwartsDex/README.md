# 🪄 HogwartsDex

A Harry Potter inspired battle simulator built with JavaScript.

This project simulates wizard duels using spells, shields, healing, mana management, and AI-based combat decisions.

---

# ⚡ Features

## 🧙 Wizard System

* Load Hogwarts characters from JSON data
* Search wizards by name
* Filter wizards by house
* View Hogwarts statistics
* Each wizard has:

  * Health
  * Mana
  * Power
  * Spell set
  * Shield system

---

## ⚔️ Duel System

* 1v1 wizard battles
* Turn-based combat
* Randomized damage/heal/shield values
* Dynamic combat logs
* Automatic win/loss handling

Example:

```bash
Harry Potter used sectumsempra
Ron Weasley lost 37 HP
Ron Weasley activated a shield
Harry Potter used incendio
Ron Weasley's shield shattered
```

---

# 🧠 AI Decision System

Each wizard can automatically decide whether to:

* Attack
* Heal
* Defend

Current decision factors:

* Current health
* Shield status
* Available mana

This creates semi-intelligent combat behavior instead of fixed actions.

---

# 🔥 Spell System

Spells are divided into:

* Attack spells
* Heal spells
* Defense spells

Each spell contains:

* Min/max power
* Mana cost
* Spell type

Example:

```js
{
    name:"sectumsempra",
    type:"attack",
    damage:{min:20,max:35},
    manaCost:{min:15,max:25}
}
```

---

# ⚔️ Current Spell Categories

## Attack Spells

* Stupefy
* Sectumsempra
* Incendio
* Confringo
* Bombarda
* Bombarda Maxima
* Diffindo
* Expulso
* Reducto
* Flipendo
* Depulso
* Expelliarmus
* Crucio
* Avada Kedavra

## Heal Spells

* Episkey
* Vulnera Sanentur
* Rennervate
* Ferula
* Brackium Emendo
* Essence of Dittany
* Enervate
* Sanentur

## Defense Spells

* Protego
* Protego Maxima
* Protego Horribilis
* Protego Totalum
* Fianto Duri
* Salvio Hexia
* Cave Inimicum
* Repello Inimicum
* Finite Incantatem

---

# 🛡️ Combat Mechanics

## Health System

* Wizards start with 200 HP
* Health reaches 0 → wizard dies

## Shield System

* Shields absorb incoming damage
* Shields can break after heavy attacks

## Mana System

* Every spell consumes mana
* Stronger spells consume more mana
* Mana regeneration supported

---

# 📂 Project Structure

```bash
HogwartsDex/
│
├── api.js
├── data.json
├── hogwarts.js
├── duel.js
├── spells.js
├── wizardsClass.js
├── dex.js
└── README.md
```

---

# 🚀 Future Improvements

Planned upgrades:

* Status effects

  * Burn
  * Poison
  * Stun
  * Silence

* Advanced AI

  * Aggressive personalities
  * Defensive personalities
  * Mana-aware decisions

* Cooldown system

* Multiplayer battles

* XP & leveling system

* Spell rarity system

* Boss battles

* Tournament mode

---

# 🧪 Example Usage

```js
let match = startMatch("harry","ron")

while(match[0].alive && match[1].alive){

    let move1 = match[0].chooseAction(match[1]);
    let result1 = match[0].performAction(
        move1.action,
        move1.defender,
        move1.spell
    )

    displayResult(result1);
}
```

---

# 🛠️ Tech Stack

* JavaScript (ES6)
* Node.js
* JSON Data Handling
* Object-Oriented Programming

---

# 🎯 Why This Project Matters

This is not just a Harry Potter fan project.

It demonstrates:

* OOP design
* Game logic engineering
* AI decision systems
* State management
* Backend-style architecture
* Combat engine design

---

# ▶️ Run The Project

```bash
node dex.js
```

---

# 📌 Author

Built by Rishant Burriwar 🚀
