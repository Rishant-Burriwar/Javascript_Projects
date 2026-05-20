# Hogwarts Duel Simulator 

A terminal-based JavaScript project inspired by the Harry Potter universe.  
This project fetches wizard data, converts characters into interactive Wizard objects, and simulates magical duels using Object-Oriented Programming principles.

---

# Features 

## Wizard System
- Converts API/local JSON data into `Wizard` objects
- Stores:
  - name
  - house
  - actor
  - alive status
  - health
  - power
  - spells

---

## Search System 
- Search wizards by name
- Case-insensitive matching
- Partial search support using `includes()`

Example:

```text
harry
→ Harry Potter
```

---

## House Filtering 
Filter all wizards by Hogwarts house.

Example:

```text
Ravenclaw
→ returns all Ravenclaw wizards
```

---

## Hogwarts Statistics 
Displays:
- total wizards
- alive wizards
- dead wizards

Example:

```text
TOTAL: 437
ALIVE: 307
DEAD: 130
```

---

# Spell System 🪄

Each wizard receives:
- 1 attack spell
- 1 heal spell
- 1 defense spell

Spells are randomly assigned during wizard creation.

---

## Attack Spells 

| Spell | Max Damage |
|---|---|
| Stupefy | 20 |
| Sectumsempra | 35 |
| Incendio | 25 |

---

## Heal Spells 

| Spell | Max Heal |
|---|---|
| Episkey | 15 |
| Vulnera Sanentur | 35 |
| Rennervate | 20 |

---

## Defense Spells 

| Spell | Max Shield |
|---|---|
| Protego | 15 |
| Protego Maxima | 35 |
| Fianto Duri | 25 |

---

# Duel System 

Implemented:
- duel initialization
- attack system
- attack power calculation
- health reduction
- spell validation
- alive/dead state checking

Current attack formula:

```text
finalDamage =
random spell damage
+
wizard power bonus
```

Example:

```javascript
let attPow = this.power/5 + randPower(spell.maxDamage);
```

---

# Project Architecture 

```text
HogwartsDex/
│
├── api.js
├── data.json
├── hogwarts.js
├── spells.js
├── wizardClass.js
└── dex.js
```

---

# Concepts Practiced 

This project focuses heavily on:
- Classes & Objects
- Arrays & Array Methods
- API Fetching
- Async/Await
- ES Modules
- Object-Oriented Programming
- State Mutation
- Validation
- Error Handling
- Randomized Systems
- Project Architecture

---

# Future Improvements 

Planned features:
- interactive menu system
- turn-based duel loop
- heal mechanics
- defense mechanics
- duel winner system
- spell cooldowns
- battle logs
- save/load system

---

# Sample Output 

```text
----WELCOME TO HOGWARTS----

Harry Potter used Stupefy
Hermione Granger lost 18 health points
```

---

# Tech Stack 

- JavaScript (Node.js)
- ES Modules
- Harry Potter API / Local JSON fallback

---

# Learning Goal 

The main goal of this project is to move beyond basic syntax and learn how to:
- structure larger projects
- model entities using classes
- manage application state
- design reusable systems
- build interactive terminal applications