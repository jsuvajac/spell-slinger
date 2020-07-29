# spell-slinger

This is the front end of a d&d 5e spell tracking tool. Demo running at: [spellslinger.app](https://spellslinger.app)

The main view of the app displays all available spells as cards, these can be filtered dynamically through the search field. Only the spells that contain the search field as as a substring of their name are displayed. The main view is intended for spell reference and spell book population.

### `Nav bar`

    search      -> filter spell cards displayed
    spell books -> open drawer for app navigation
    +           -> create new spell book
    -           -> delete existing spell book

### `Spell Cards`
Example

    Wish

    Level: 9th-level
    Range: Self
    Components: V
    Duration: Instantaneous
    Class: (Sorcerer, Wizard)
    Casting time: 1 action

    {flip button} {add/remove from spell book button}

#### `Actions`
    flip        -> inserts the spell's text blurb between the title and the metadata
    add/remove  -> if main view:
                       add the spell to an existing book
                   if spell book view:
                       remove the spell form the spell book


Internally the spells are just a list of objects that does not change and is loaded in when the app loads.

### `Spell Books`
A spell book is a set of spells, implemented as a set of indices of the spell array.
When a spell book is created the app creates a dynamic rout at '/spellbookname'

So, a spell book contining:

    Abi-Dalzim's Horrid Wilting, Absorb Elements, Acid Splash, Aid
will be represented as:

    [0, 1, 2, 4]

#### `Serialization`
A spell book is converted to 3 digit hex array, packed and padded into a unicode string.

The spell books are stored in the localStorage allowing for persistence across wrowser sessions.
