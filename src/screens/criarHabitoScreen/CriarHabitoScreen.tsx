import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { criarHabito, CriarHabitoRequest } from '../../api/habitoService';
import { styles } from './CriarHabitoScreen.styles';

const WEEK = [{ label: 'S', value: 1 }, { label: 'T', value: 2 }, { label: 'Q', value: 3 }, { label: 'Q', value: 4 }, { label: 'S', value: 5 }, { label: 'S', value: 6 }, { label: 'D', value: 7 }];
type PickerKind = 'inicio' | 'fim' | 'lembrete' | 'dataInicio' | 'dataFim';
const dateOnly = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const timeOnly = (date: Date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

export default function CriarHabitoScreen({ navigation }: any) {
  const today = new Date();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [diasSemana, setDiasSemana] = useState<number[]>([]);
  const [horarioInicio, setHorarioInicio] = useState<Date | null>(null);
  const [horarioFim, setHorarioFim] = useState<Date | null>(null);
  const [dataInicio, setDataInicio] = useState(today);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [indefinido, setIndefinido] = useState(true);
  const [lembreteAtivo, setLembreteAtivo] = useState(false);
  const [horarioLembrete, setHorarioLembrete] = useState<Date | null>(null);
  const [picker, setPicker] = useState<PickerKind | null>(null);
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => ({
    nome: nome.trim() ? '' : 'Informe um título.',
    dias: diasSemana.length ? '' : 'Selecione pelo menos um dia.',
    horario: horarioInicio && horarioFim && timeOnly(horarioFim) <= timeOnly(horarioInicio) ? 'O fim deve ser depois do início.' : '',
    dataFim: !indefinido && dataFim && dateOnly(dataFim) < dateOnly(dataInicio) ? 'A data final deve ser igual ou posterior à inicial.' : '',
    lembrete: lembreteAtivo && !horarioLembrete ? 'Escolha um horário para o lembrete.' : '',
  }), [nome, diasSemana, horarioInicio, horarioFim, indefinido, dataInicio, dataFim, lembreteAtivo, horarioLembrete]);
  const valid = !Object.values(errors).some(Boolean) && !loading && (indefinido || Boolean(dataFim));

  function toggleDay(day: number) {
    setDiasSemana((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day].sort());
  }
  function chooseDate(kind: PickerKind, date: Date) {
    if (kind === 'inicio') setHorarioInicio(date);
    if (kind === 'fim') setHorarioFim(date);
    if (kind === 'lembrete') setHorarioLembrete(date);
    if (kind === 'dataInicio') setDataInicio(date);
    if (kind === 'dataFim') setDataFim(date);
  }
  function onPickerChange(event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') setPicker(null);
    if (event.type === 'set' && selected && picker) chooseDate(picker, selected);
  }
  function pickerValue(kind: PickerKind) {
    if (kind === 'inicio') return horarioInicio ?? new Date();
    if (kind === 'fim') return horarioFim ?? new Date();
    if (kind === 'lembrete') return horarioLembrete ?? new Date();
    if (kind === 'dataFim') return dataFim ?? dataInicio;
    return dataInicio;
  }
  function abrirPicker(kind: PickerKind) {
    setPicker(kind);
  }
  async function salvar() {
    if (!valid) return;
    const payload: CriarHabitoRequest = {
      nome: nome.trim(), descricao: descricao.trim() || null, diasSemana,
      horarioInicio: horarioInicio ? timeOnly(horarioInicio) : null,
      horarioFim: horarioFim ? timeOnly(horarioFim) : null,
      dataInicio: dateOnly(dataInicio), dataFim: indefinido ? null : (dataFim ? dateOnly(dataFim) : null),
      horarioLembrete: lembreteAtivo && horarioLembrete ? timeOnly(horarioLembrete) : null,
    };
    try {
      setLoading(true);
      await criarHabito(payload);
      navigation.goBack();
    } catch {
      Alert.alert('Não foi possível criar', 'Confira sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const dateMode = picker === 'dataInicio' || picker === 'dataFim';
  return <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>Novo hábito</Text>
    <Text style={styles.subtitle}>Um passo de cada vez.</Text>
    <Text style={styles.label}>TÍTULO</Text>
    <TextInput value={nome} onChangeText={setNome} placeholder="Ex.: Ler um livro" placeholderTextColor="#858B96" style={styles.input} maxLength={80} />
    {!!errors.nome && <Text style={styles.error}>{errors.nome}</Text>}
    <Text style={styles.label}>DESCRIÇÃO · OPCIONAL</Text>
    <TextInput value={descricao} onChangeText={setDescricao} placeholder="Adicione um detalhe" placeholderTextColor="#858B96" style={[styles.input, styles.multiline]} multiline textAlignVertical="top" />
    <Text style={styles.label}>FREQUÊNCIA</Text>
    <View style={styles.days}>{WEEK.map((day, index) => <TouchableOpacity key={day.value} style={[styles.day, diasSemana.includes(day.value) && styles.daySelected]} onPress={() => toggleDay(day.value)}><Text style={[styles.dayText, diasSemana.includes(day.value) && styles.dayTextSelected]}>{day.label}</Text></TouchableOpacity>)}</View>
    <View style={styles.shortcuts}><TouchableOpacity onPress={() => setDiasSemana([1,2,3,4,5,6,7])}><Text style={styles.shortcut}>Todos os dias</Text></TouchableOpacity><TouchableOpacity onPress={() => setDiasSemana([1,2,3,4,5])}><Text style={styles.shortcut}>Dias úteis</Text></TouchableOpacity></View>
    {!!errors.dias && <Text style={styles.error}>{errors.dias}</Text>}
    <Text style={styles.label}>HORÁRIO · OPCIONAL</Text>
    <View style={styles.row}><TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker('inicio')}><Text style={styles.pickerLabel}>Início</Text><Text style={styles.pickerValue}>{horarioInicio ? timeOnly(horarioInicio) : 'Adicionar'}</Text></TouchableOpacity><TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker('fim')}><Text style={styles.pickerLabel}>Fim</Text><Text style={styles.pickerValue}>{horarioFim ? timeOnly(horarioFim) : 'Adicionar'}</Text></TouchableOpacity></View>
    {!!errors.horario && <Text style={styles.error}>{errors.horario}</Text>}
    <Text style={styles.label}>DURAÇÃO</Text>
    <View style={styles.switchRow}><Text style={styles.switchText}>Tempo indefinido</Text><Switch value={indefinido} onValueChange={setIndefinido} trackColor={{ true: '#79D9AE' }} thumbColor="#FFFFFF" /></View>
    {!indefinido && <View style={styles.row}><TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker('dataInicio')}><Text style={styles.pickerLabel}>Data de início</Text><Text style={styles.pickerValue}>{dateOnly(dataInicio)}</Text></TouchableOpacity><TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker('dataFim')}><Text style={styles.pickerLabel}>Data de fim</Text><Text style={styles.pickerValue}>{dataFim ? dateOnly(dataFim) : 'Selecionar'}</Text></TouchableOpacity></View>}
    {!!errors.dataFim && <Text style={styles.error}>{errors.dataFim}</Text>}
    {!indefinido && !dataFim && <Text style={styles.error}>Selecione a data de fim.</Text>}
    <Text style={styles.label}>LEMBRETE</Text>
    <View style={styles.switchRow}><Text style={styles.switchText}>Adicionar lembrete</Text><Switch value={lembreteAtivo} onValueChange={setLembreteAtivo} trackColor={{ true: '#79D9AE' }} thumbColor="#FFFFFF" /></View>
    {lembreteAtivo && <TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker('lembrete')}><Text style={styles.pickerLabel}>Horário do lembrete</Text><Text style={styles.pickerValue}>{horarioLembrete ? timeOnly(horarioLembrete) : 'Selecionar horário'}</Text></TouchableOpacity>}
    {!!errors.lembrete && <Text style={styles.error}>{errors.lembrete}</Text>}
    {picker && <View style={styles.pickerContainer}><DateTimePicker value={pickerValue(picker)} mode={dateMode ? 'date' : 'time'} display={Platform.OS === 'ios' ? (dateMode ? 'compact' : 'spinner') : 'default'} onChange={onPickerChange} minimumDate={picker === 'dataFim' ? dataInicio : undefined} /></View>}
    {Platform.OS === 'ios' && picker && <TouchableOpacity onPress={() => setPicker(null)}><Text style={styles.shortcut}>Concluir seleção</Text></TouchableOpacity>}
    <TouchableOpacity style={[styles.submit, !valid && styles.submitDisabled]} onPress={salvar} disabled={!valid}>{loading ? <ActivityIndicator color="#12221B" /> : <Text style={styles.submitText}>Criar hábito</Text>}</TouchableOpacity>
  </ScrollView>;
}
