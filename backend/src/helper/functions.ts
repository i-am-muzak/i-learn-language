export function textToSSML(text: string): string {
  // Split text into sentences.
  const sentences = text.split(/[.?!]+/);
  var modifiedSentences = [];
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    if (sentence) {
      const start_idx = text.indexOf(sentence);

      // Trim each substring to remove unwanted spaces.
      const modified_sentence = text
        .substring(start_idx, start_idx + sentence.length + 1)
        .trimStart();
      const ssmlSentence = `<mark name="${i}"/>${modified_sentence}`;
      modifiedSentences.push(ssmlSentence);
    }
  }

  return `<speak>${modifiedSentences.join("")}</speak>`;
}
