# Individuell examination: Strajk bowling

## Bakgrund

**Strajk bowling är en nyöppnad bowlinghall i centrala Bromölla. Ägaren K. Ägla gillar tekniska lösningar och har tillsammans med brorsonen Keso Ägla [designat en mockup](https://www.figma.com/design/INM5DgClQ78fVvlbIaor07/Strajk-1.0-Typescript?node-id=0-1&t=Egt6IzRwlgVn9aZh-1).**
**Herr Ägla är väldigt nöjd med designen och vill att appen ser ut och fungerar enligt angiven spec. Gränssnittet behöver endast vara anpassat efter mobila enheter.**

## Val av tekniker

- React
- Typescript

## Krav på funktionalitet

- Det ska gå att boka en bana för N antal personer
- Det ska gå att boka N antal skor
- Det ska gå att se en bekräftelse på sin bokning

| View Namn    | Funktionalitet                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Booking      | Användaren ska kunna boka _datum_ och _tid_ samt ange _antal spelare_. Vid val av spelare skall formulär för skobokning dyka upp. Vid knapp på strike skickas _request_ iväg till servern. |
| Confirmation | Vid ivägskickad request fås en bokning tillbaka inkl totalsumma ( 120kr / pers + 100kr / bana )och bokningsnummer.                                                                         |
| Meny         | Vid klick på _naviconen_ visas menyn på lämpligt sätt.                                                                                                                                     |

## Figmaskiss

Skiss: https://www.figma.com/design/INM5DgClQ78fVvlbIaor07/Strajk-1.0-Typescript?node-id=0-1&t=Egt6IzRwlgVn9aZh-1

## Backend API

Din app ska skicka en `booking request` bokningar till Strajks backend. Du får då tillbaka ett `booking response`.

## Models

### Booking Model

**Request**

```json
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43]
}
```

**Response**

```json
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43],
  "price": 580, // räknas ut på serversidan
  "id": "str7283472", // genereras på serversidan
  "active": true // anges på serversidan.
}
```

## Betygskriterier

**För Godkänt:**

- Implementerat all funktionalitet
- Ser ut som skiss (viss variation i färger, typsnitt etc är tillåtet)
- Är gjord i Typescript
- Alla variabler, states, props ska ha en datatyp eller varje upptypade med en `type` eller `interface`.

**För Väl Godkänt:**

- Alla kriterier för Godkänt
- Det ska finnas en validering kring antalet skor och spelare. Ex: om det är 4 spelare ska man ha matat in exakt 4 skostorlekar.
- Det ska finnas validering kring antalet spelare och banor, max 4 spelare per bana.
