
// Variável para armazenar as vozes disponíveis
let voices = [];

// Função para obter as vozes disponíveis e preencher o menu de seleção
function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');

    // Limpar o menu de seleção
    voiceSelect.innerHTML = '';

    //Filtrando as voices
    const filteredVoices = voices.filter(voice => 
      voice.lang.startsWith('pt-')
    )

    filteredVoices.sort((a,b) => a.name.localeCompare(b.name))

    filteredVoices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}
populateVoiceList()
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Função para converter o texto em voz
function convertTextToVoice() {
    const text = document.getElementById('text-input').value;
    const voiceSelect = document.getElementById('voice-select');
    const selectedVoiceIndex = voiceSelect.value;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; // Definir o idioma padrão para português do Brasil
        utterance.voice = voices[selectedVoiceIndex]; // Definir a voz selecionada        

        window.speechSynthesis.speak(utterance);                
    } else {
        alert('Desculpe, seu navegador não suporta a Web Speech API.');
    }
}

function pause(){
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel()
  }else {
    alert('Desculpe, seu navegador não suporta a Web Speech API.');
  }
}