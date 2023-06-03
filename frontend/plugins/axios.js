export default ({ $axios, env }) => {
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY5NTc1ODgsImlhdCI6MTY4NTc0Nzk4OCwic3ViIjoiMiIsInRva2VuX3R5cGUiOiJiZWFyZXIifQ.3NLzFsphkwa3E60_LPC5YAioumGEanB9hKK7PWCn7-k`;
  });
}
