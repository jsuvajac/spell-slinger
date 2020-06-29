/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = ({ actions }) => {
  const { createPage } = actions

  const spellData = [
    {
        "Casting time": "1 Action",
        "Class": [
            "Wizard,",
            "Sorcerer,"
        ],
        "Components": "V, S",
        "Duration": "Instantaneous",
        "Level": "Cantrip",
        "Name": "Acid Splash",
        "Page": "211 Players Handbook",
        "Range": "60 feet",
        "School": "Conjuration",
        "Text": [
            "You hurl a bubble of acid.",
            "Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
            "At higher level",
            "This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
        ]
    },
    {
        "Casting time": "1 Action",
        "Class": [
            "Paladin,",
            "Cleric,"
        ],
        "Components": "V, S, M (a tiny strip of white cloth)",
        "Duration": "8 hours",
        "Level": "2",
        "Name": "Aid",
        "Page": "211 Players Handbook",
        "Range": "30 feet",
        "School": "Abjuration",
        "Text": [
            "Your spell bolsters your allies with toughness and resolve.",
            "Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration.",
            "At higher level",
            "When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd."
        ]
    }
  ]
  spellData.forEach(spell => {
    createPage({
      path: `/spell/${spell.Name}`,
      component: require.resolve(`./src/templates/spell-template.js`),
      context: { spell },
    })
  })
}