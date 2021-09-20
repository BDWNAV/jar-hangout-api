const router = require("express").Router();
const User = require("../models/User");
const Suggestion = require("../models/Suggestions");
const { kickUser } = require("../utils/api");

router.get('/:guildId/:userId/kick', async (req, res) => {
  const guildId = req.params.guildId;
  const userId = req.params.userId;

  if (req.user) {
    const channels = await kickUser(guildId, userId);

    console.log(channels);

    res.send(channels);
  } else {
    return null;
  }
});

router.get('/:guildId/:userId/suggestions/:suggestionTitle', async (req, res) => {
  const { guildId, userId, suggestion, suggestionTitle } = req.body;

  if (req.user) {
    res.send(req.user);
  } else {
    return null;
  }
});

router.put('/:guildId/:userId/suggestions/:suggestionTitle', async (req, res) => {
  const { guildId, userId, suggestion, suggestionTitle } = req.body;

  try {
    if (req.user) {
      const newSuggestion = await Suggestion.create({
        guildId: guildId,
        userId: userId,
        suggestionTitle: suggestionTitle,
        suggestion: suggestion
      });

      res.send(suggestion);
    } else {
      res.status(403).json({
        msg: "The user is not authorized!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "A unexpected error has occured!"
    });
  }
});

module.exports = router;