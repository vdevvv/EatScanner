import React from "react";

export type CommonData = {
  userId?: string;
  email?: string;
  emailVerificationToken?: string;
}

export type StepProps = {
  onNext?: () => void;
  setCommonData?: React.Dispatch<React.SetStateAction<CommonData>>;
  commonData?: CommonData;
}