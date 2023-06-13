import React, {FC, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, View, Text, StyleSheet} from 'react-native';
import CardItem from './CardItem';
import {THEME} from '../assets/theme';

// i don`t create type files, and write all types on page.

interface CardListProps {
  cards: cardType[];
  changeCard: Function;
}

type cardType = {
  title: string;
  text: string;
  image?: string;
  url?: string;
  id: number;
};

const CardList: FC<CardListProps> = ({changeCard, cards}) => {
  const [cardList, setListCards] = useState<cardType[]>([]);

  const renderItem: ListRenderItem<cardType> = ({item}) => (
    <CardItem card={item} changeCard={changeCard} />
  );

  useEffect(() => {
    cards && setListCards(cards);
  }, [cards]);

  return (
    <View style={{padding: 16}}>
      {cardList?.length ? (
        <FlatList
          data={cardList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Card list is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.spacing32,
  },
  emptyText: {
    color: THEME.color.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CardList;
