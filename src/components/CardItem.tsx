import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {THEME} from '../assets/theme';
import AppButton from '../atoms/AppButton';
import {useRemoveCardMutation} from '../store/card/cardSlice';

interface CardItemProps {
  card: cartType;
  changeCard: Function;
}

type cartType = {
  title: string;
  text: string;
  image?: string;
  url?: string;
  id: number;
};

const CardItem: FC<CardItemProps> = ({card, changeCard}) => {
  const [removeCard] = useRemoveCardMutation();

  return (
    <View style={styles.card}>
      <View style={styles.contet}>
        <View style={styles.contetTop}>
          <View style={styles.imageBlock}>
            {card?.image && (
              <Image
                style={styles.image}
                source={{
                  uri: card?.image,
                }}
              />
            )}
          </View>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{card.title}</Text>
            </View>
            <Text style={styles.contentText}>{card.text}</Text>
            {card?.url && (
              <TouchableOpacity
                style={styles.link}
                onPress={() => Linking.openURL(`${card?.url}`)}>
                <Text style={styles.linkText}>Go to link</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <AppButton
          variant="redSmall"
          title="Remove"
          onPress={() => removeCard(card?.id)}
        />
        <AppButton
          variant="small"
          title="Edit"
          onPress={() => changeCard(card)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: THEME.spacing.spacing12,
    borderRadius: 5,
    backgroundColor: THEME.color.primary,
    marginBottom: THEME.spacing.spacing16,
    maxWidth: '100%',
  },
  title: {
    marginBottom: 5,
  },
  contet: {
    maxWidth: '70%',
    marginBottom: 20,
  },
  contetTop: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.color.darkGreen,
  },
  contentText: {
    fontSize: 12,
    color: THEME.color.darkGreen,
    paddingRight: 10,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    height: 75,
    width: 75,
    resizeMode: 'contain',
  },
  imageBlock: {
    height: 75,
    width: 75,
    marginRight: 20,
    marginBottom: 5,
    backgroundColor: THEME.color.transparentLight,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: THEME.color.darkGreen,
    fontSize: 16,
  },
});

export default CardItem;
