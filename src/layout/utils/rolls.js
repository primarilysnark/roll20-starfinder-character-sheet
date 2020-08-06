function getBasicMacroRoll(name, rollFormula, notes) {
  return `@{rolls_whisper} &{template:base} {{rollname=${name}}} {{result=[[${rollFormula}]]}} {{show_name=[[0 + @{rolls_show_name}]]}} {{character_name=@{character_name}}}${
    notes ? ` {{notes=${notes}}}` : ''
  }`
}

module.exports = {
  getBasicMacroRoll,
}
