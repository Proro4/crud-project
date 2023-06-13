import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, Text} from 'react-native';
import {THEME} from '../assets/theme';
import CardList from '../components/CardList';
import AppButton from '../atoms/AppButton';
import ModalForm from '../components/ModalForm';
import {useFetchCardsQuery} from '../store/card/cardSlice';

const {height, width} = Dimensions.get('window');

type CardType = {
  title: string;
  text: string;
  image?: string;
  url?: string;
  id: number;
};

const App = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [cards, setCards] = useState<CardType[] | []>([]);
  const [cardItem, setCardItem] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {data: CardData} = useFetchCardsQuery();

  useEffect(() => {
    CardData && setCards(CardData);
    setLoading(false);
  }, [CardData]);

  const clearModalAfterClean = () => {
    setCardItem(null);
    setIsShowModal(false);
  };
  const changeCard = (card: CardType) => {
    setCardItem(card);
    setIsShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <View style={{marginBottom: 20, maxHeight: '80%'}}>
            <CardList cards={cards} changeCard={changeCard} />
          </View>
          <AppButton
            variant="primary"
            title="Add to Card"
            onPress={() => setIsShowModal(true)}
          />
          {isShowModal && (
            <ModalForm cardItem={cardItem} closeModal={clearModalAfterClean} />
          )}
        </>
      ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.color.white,
    height: height,
    width: width,
  },
  loading: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 22,
    color: THEME.color.black,
    fontWeight: 'bold',
  }
});

export default App;
