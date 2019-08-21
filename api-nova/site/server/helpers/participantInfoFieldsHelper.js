
const getFormedParticipantOption = (participantinfofieldsId, options) => {
  const participantsOptions = [];
  for (let key in options) {
    if (options[key]) {
      participantsOptions.push({
        participantinfofieldsId,
        allowedValues: options[key]
      });
    }
  }
  return participantsOptions;
}

module.exports = { getFormedParticipantOption };
