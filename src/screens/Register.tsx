import { useState } from 'react';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert('Nova solicitação', 'Preencha todos os campos.')
    }

    setIsLoading(true)
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Nova Solicitação', 'Solicitação registrada com sucesso!')
        navigation.goBack()
      })
      .catch(error => {
        setIsLoading(false)
        return Alert.alert('Nova Solicitação', 'Não foi possível registrar. Tente novamente mais tarde.')
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder='Número do patrimônio'
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrder}
      />

    </VStack>
  );
}