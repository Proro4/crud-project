import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../assets/theme';
import AppInput from '../atoms/AppInput';
import AppButton from '../atoms/AppButton';
import {useSendNewCardMutation, useSendChangedCardMutation} from '../store/card/cardSlice';

interface ModalFormProps {
  cardItem: cardType | null;
  closeModal: Function;
}

type cardType = {
  title: string;
  text: string;
  image: string;
  url: string;
  id?: number;
};

const ModalForm: FC<ModalFormProps> = ({cardItem, closeModal}) => {
  const [card, setCard] = useState<cardType>({
    title: '',
    text: '',
    image: '',
    url: '',
  });
  const [formTouched, setFormTouched] = useState<boolean>(false);

  const [sendNewCard] = useSendNewCardMutation();
  const [sendChangedCard] = useSendChangedCardMutation()

  const changeInputText = (inputValue: string, inputKey: string) => {
    setCard((prev: cardType) => ({...prev, [`${inputKey}`]: inputValue}));
  };

  const exitFromModal = () => {
    setCard({title: '', text: '', image: '', url: '', id: undefined});
    closeModal();
  };

  useEffect(() => {
    cardItem && setCard(cardItem);
  }, [cardItem]);

  const sendCard = () => {
    setFormTouched(true);
    if (validateForm()) {
      card?.id ? sendChangedCard({...card}) : sendNewCard({...card});
      closeModal();
    }
  };

  const validateForm = () => {
    if (card.title.length && card.text) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.modal}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={exitFromModal}
      />
      <View style={styles.modalBlock}>
        <View>
          {card?.id ? (
            <Text style={styles.title}>Change card # {card.id}</Text>
          ) : (
            <Text style={styles.title}>Create new card</Text>
          )}
          <View style={styles.editItemLabel}>
            <AppInput
              onTextChange={(text: string) => changeInputText(text, 'title')}
              value={card?.title}
              placeholder="Title"
              type="text"
              touched={formTouched}
            />
          </View>
          <View style={styles.editItemLabel}>
            <AppInput
              onTextChange={(text: string) => changeInputText(text, 'image')}
              value={card?.image}
              placeholder="Image url"
              type="text"
              touched={formTouched}
            />
          </View>
          <View style={styles.editItemLabel}>
            <AppInput
              onTextChange={(text: string) => changeInputText(text, 'url')}
              value={card?.url}
              placeholder="Link url"
              type="text"
              touched={formTouched}
            />
          </View>
          <View style={styles.editItemLabel}>
            <AppInput
              onTextChange={(text: string) => changeInputText(text, 'text')}
              value={card?.text}
              placeholder="Text"
              type="textarea"
              touched={formTouched}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <AppButton
            variant="redSmall"
            title="CANCEL"
            onPress={exitFromModal}
          />
          <AppButton variant="small" title="SAVE" onPress={sendCard} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: THEME.color.transparentGray,
  },
  modalBlock: {
    padding: THEME.spacing.spacing16,
    backgroundColor: THEME.color.white,
    minWidth: '80%',
    maxWidth: '90%',
    minHeight: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    minWidth: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    color: THEME.color.dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleText: {},
  editItemLabel: {
    marginBottom: 30,
    paddingVertical: 15,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ModalForm;
