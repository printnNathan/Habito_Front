const DIAS_SEMANA = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function formatarDataHoje(data: Date = new Date()): string {
  const diaSemana = DIAS_SEMANA[data.getDay()];
  const mes = MESES[data.getMonth()];
  return `${diaSemana}, ${data.getDate()} de ${mes}`;
}

export function gerarSaudacao(data: Date = new Date()): string {
  const hora = data.getHours();
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}