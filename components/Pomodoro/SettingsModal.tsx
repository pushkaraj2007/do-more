import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  DarkMode,
  Text,
  Input,
  useNumberInput,
  Flex,
} from "@chakra-ui/react";
import ThemeSelect from "./ThemeSelect";
import { useState } from "react";
import usePomodoroStore from "@/utils/pomodoroStore";
import MinuteInput from "./MinuteInput";

type Props = { isOpen: boolean; onClose: () => void };

const SettingsModal = ({ isOpen, onClose }: Props) => {
  const [
    themeColor,
    workMins,
    breakMins,
    changeWorkMins,
    changeBreakMins,
    setThemeColor,
  ] = usePomodoroStore((state) => [
    state.themeColor,
    state.workMins,
    state.breakMins,
    state.changeWorkMins,
    state.changeBreakMins,
    state.changeThemeColor,
  ]);

  const [workMinInputValue, setWorkMinInputValue] = useState(workMins);
  const [breakMinInputValue, setBreakMinInputValue] = useState(breakMins);

  const [color, setColor] = useState(themeColor);

  const applyChanges = () => {
    changeBreakMins(breakMinInputValue);
    changeWorkMins(workMinInputValue);
    setThemeColor(color);

    localStorage.setItem("workMins", workMins.toLocaleString());
    localStorage.setItem("breakMins", breakMins.toLocaleString());
    localStorage.setItem("themeColor", themeColor);

    onClose();
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 10,
      max: 120,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <DarkMode>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background="darkBg">
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            gap="2rem"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex flexDir="column" w="80%" gap="1rem">
              <Text
                fontSize="sm"
                textAlign="center"
                fontWeight="medium"
                color="whiteAlpha.700"
              >
                Durations
              </Text>

              <Flex justifyContent="space-between">
                <MinuteInput
                  value={workMinInputValue}
                  onPlusButtonClick={() => {
                    setWorkMinInputValue(workMinInputValue + 1);
                  }}
                  onMinusButtonClick={() => {
                    setWorkMinInputValue(workMinInputValue - 1);
                  }}
                  onChange={(e: any) => {
                    setWorkMinInputValue(e.target.value);
                  }}
                />
                <MinuteInput
                  value={breakMinInputValue}
                  onPlusButtonClick={() => {
                    setBreakMinInputValue(breakMinInputValue + 1);
                  }}
                  onMinusButtonClick={() => {
                    setBreakMinInputValue(breakMinInputValue - 1);
                  }}
                  onChange={(e: any) => {
                    setBreakMinInputValue(e.target.value);
                  }}
                />
              </Flex>
            </Flex>

            {/* COLOR SCHEME */}
            <Flex flexDir="column" gap="1rem">
              <Text
                fontSize="sm"
                textAlign="center"
                fontWeight="medium"
                color="whiteAlpha.700"
              >
                Theme Color
              </Text>
              <ThemeSelect onChange={setColor} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              _hover={{ background: color }}
              _active={{ background: color, filter: "brightness(90%)" }}
              mr={3}
              textColor="white"
              onClick={applyChanges}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default SettingsModal;
