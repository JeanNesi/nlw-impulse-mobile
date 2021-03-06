import React, { useRef , useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { styles } from './styles';
import { Options } from '../options';
import { Form } from '../form';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Success } from '../success'

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent(){
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity 
      style={styles.button}
      onPress={handleOpen}
      >
        <ChatTeardropDots
        size={24}
        weight= 'bold'
        />
      </TouchableOpacity>

      <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1,280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ?
          <Success onSendAnotherFeedback={handleRestartFeedback}/>
          :
          <>
              {
                feedbackType ?
                  <Form
                   feedbackType={feedbackType}
                   onFeedbackCanceled={handleRestartFeedback}
                   onFeedbackSend={handleFeedbackSent}
                />
                :
                <Options onFeedbackTypeChanged={setFeedbackType}/>
              }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);