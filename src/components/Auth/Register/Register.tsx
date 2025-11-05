import {commonStyles} from "../common.styles";
import {View} from "react-native";
import React, {FC, useState} from "react";
import EnterEmail from "./steps/EnterEmail";
import ConfirmEmail from "./steps/ConfirmEmail";
import {CommonData} from "./steps/types";
import CreatePassword from "./steps/CreatePassword";

type CurrentStep = 'EnterEmail' | 'ConfirmEmail' | 'CreatePassword';

type RegisterProps = {
  setAuthMode: (mode: 'signIn' | 'signUp') => void;
}

const Register: FC<RegisterProps> = ({setAuthMode}) => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('EnterEmail');
  const [commonData, setCommonData] = useState<CommonData>({})

  const getCurrentStep = () => {
    switch (currentStep) {
      case 'EnterEmail':
        return (
          <EnterEmail
            setCommonData={setCommonData}
            onNext={() => setCurrentStep('ConfirmEmail')}
          />
        )
      case 'ConfirmEmail':
        return (
          <ConfirmEmail
            setCommonData={setCommonData}
            onNext={() => setCurrentStep('CreatePassword')}
            commonData={commonData}
          />
        )
      case 'CreatePassword':
        return (
          <CreatePassword
            commonData={commonData}
            onNext={() => setAuthMode('signIn') }
          />
        )
    }
  }

  return (
    <View style={commonStyles.container}>
      {getCurrentStep()}
    </View>
  );
};

export default Register;