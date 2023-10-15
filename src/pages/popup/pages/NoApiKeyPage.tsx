import React, { ChangeEventHandler, useState } from "react";
import {
  Button,
  HStack,
  Input,
  Link,
  OrderedList,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Footer from "@pages/popup/components/layout/Footer";
import StyledButton from "@pages/popup/components/StyledButton";
import { COLORS } from "@src/constant/style";
import { t } from "@src/chrome/i18n";

// type definition of apiKeyType to store accessKeyId, secretAccessKey, sessionToken
type apiKeyType = {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
}

type NoApiKeyPageProps = {
  checkApiKey: (key: apiKeyType) => void;
  apiKeyError?: Error;
  loading: boolean;
};
export const NoApiKeyPage = ({
  loading,
  checkApiKey,
  apiKeyError,
}: NoApiKeyPageProps) => {
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const handleAccessKeyIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAccessKeyId(event.target.value);
  };

  const handleSecretAccessKeyChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSecretAccessKey(event.target.value);
  };

  const handleSessionTokenChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSessionToken(event.target.value);
  };

  const onClickSaveButton = () => {
    checkApiKey({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      sessionToken: sessionToken
  });
  };

  return (
    <>
      <VStack>
        {loading ? (
          <VStack spacing={5}>
            <Spinner width={7} height={7} color={COLORS.WHITE} />
            <Text color={COLORS.WHITE} whiteSpace="pre-wrap" lineHeight={1.4}>
              {t("noApiKeyPage_checkingApiKey")}
            </Text>
          </VStack>
        ) : (
          <>
            <HStack mb={3}>
              <Input
                value={accessKeyId}
                type="password"
                h="24px"
                onChange={handleAccessKeyIdChange}
                placeholder={t("noApiKeyPage_accessKeyId_placeholder")}
                size="sm"
              />
            </HStack>

            <HStack mb={3}>
              <Input
                value={secretAccessKey}
                type="password"
                h="24px"
                onChange={handleSecretAccessKeyChange}
                placeholder={t("noApiKeyPage_secretAccessKey_placeholder")}
                size="sm"
              />
            </HStack>

            <HStack mb={3}>
              <Input
                value={sessionToken}
                type="password"
                h="24px"
                onChange={handleSessionTokenChange}
                placeholder={t("noApiKeyPage_sessionToken_placeholder")}
                size="sm"
              />
            </HStack>

            <HStack mb={3}>
              <StyledButton h="24px" size="md" onClick={onClickSaveButton}>
                {t("noApiKeyPage_saveButtonText")}
              </StyledButton>
            </HStack>
          </>
        )}
        {apiKeyError && (
          <VStack>
            <Text fontWeight="bold" color={COLORS.RED}>
              {apiKeyError.name}
            </Text>
            <Text whiteSpace="pre-wrap" color={COLORS.RED}>
              {apiKeyError.message}
            </Text>
          </VStack>
        )}
      </VStack>
      <Footer />
    </>
  );
};

const separateI18nAndAddLink = (text: string, link: string) => {
  const [prev, rest] = text.split("{");
  const [linkText, next] = rest.split("}");
  return (
    <>
      {prev}
      <Link color={COLORS.PRIMARY} href={link} target="_blank">
        {linkText}
      </Link>
      {next}
    </>
  );
};
