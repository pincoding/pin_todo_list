// import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  VStack,
  Flex,
  Checkbox,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import React from "react";

const App = () => {
  const [todos, settodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [currentId, setcurrentId] = useState();
  const [numdata, setNumdata] = useState();
  const toast = useToast();

  const dateDate = new Date();

  const krDate = `${dateDate.getFullYear()}년${
    dateDate.getMonth() + 1
  }월${dateDate.getDate()}일`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    const { todo } = data;
    settodos([
      ...todos,
      {
        id: Date.now(),
        text: todo,
        finish: false,
      },
    ]);
    reset();
  };

  const onChangeCheck = (id) => {
    settodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onClickAllDelete = () => {
    const todosDataid = todos.filter((data) => (data.finish ? data.id : ""));
    if (todosDataid.length === 0) {
      setNumdata(false);
      toast({
        title: "삭제할수 없습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setNumdata(true);
      console.log("헤헤헤");
      console.log(numdata);
      const overlap = todosDataid.map((data) => data.id);
      settodos(todos.filter((todo) => !overlap.includes(todo.id)));
      toast({
        title: "삭제되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container
        maxW={"450px"}
        w={"100%"}
        minH={"100vh"}
        bg={"white"}
        alignItems={"center"}
        padding={"0 30px"}
        boxShadow={"0px 0px 20px 15px rgba(0,0,0,0.06)"}
      >
        <Box w={"100%"} pt={"40px"}>
          <Heading fontSize={"22px"} padding={"0px 0px"}>
            <HStack w={"100%"} padding={"20px 0"}>
              <Box w={"100%"} display={"flex"}>
                <Box
                  w={"60%"}
                  color={"gray.800"}
                  padding={"0px"}
                  lineHeight={"40px"}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      color: "black",
                    }}
                  >
                    {`${krDate}`}
                  </h2>
                  <h2
                    style={{ fontSize: "16px", color: "#5a71da" }}
                  >{` ${todos.length} List`}</h2>
                </Box>
              </Box>
            </HStack>
          </Heading>
        </Box>
        <Box as="form" onSubmit={handleSubmit(submitHandler)}>
          <Input
            {...register("todo", {
              required: "한글자 이상 입력해주세요.",
              pattern: {
                value: /^\S[a-zA-Z0-9 ]*$/,
                message: "공백은 입력 할 수 없습니다.",
              },
            })}
            boxShadow={"1px 1px 5px 1px #d0d6f2"}
            sx={{ "::placeholder": { color: "black", opacity: "0.4" } }}
            type="text"
            placeholder="하루 계획 적어주세요."
            focusBorderColor="gray.900"
          ></Input>
          <p style={{ marginLeft: "17px", color: "blue", fontSize: "14px" }}>
            {errors?.todo?.message}
          </p>
        </Box>

        {todos.length > 0 ? (
          <WrapItem
            // border={"2px solid #d0d6f2"}

            onClick={() => {
              onOpen();
            }}
          >
            <Button
              mt={"10px"}
              w={"80px"}
              h={"26px"}
              fontSize={"14px"}
              colorScheme="messenger"
            >
              선택삭제
            </Button>
          </WrapItem>
        ) : (
          ""
        )}

        <Box>
          <VStack mt={"40px"}>
            {todos.map((data) => (
              <Checkbox
                // bg={"gray"}
                w={"100%"}
                h={"50px"}
                key={data.id}
                isChecked={data.finish}
                onChange={() => onChangeCheck(data.id)}
                padding={"5px 10px"}
              >
                <Flex>
                  <Box width={"0px"}>
                    <Text
                      as={data.finish ? "s" : ""}
                      color={data.finish ? "gray.400" : ""}
                      fontWeight={"500"}
                    >
                      {data.text}
                    </Text>
                  </Box>
                </Flex>

                <DeleteIcon
                  position={"absolute"}
                  right={"20px"}
                  top={"50%"}
                  transform={"translateY(-50%)"}
                  opacity={"0.7"}
                  onClick={() => {
                    onOpen();
                    // setcurrentId(data.id);
                  }}
                />
                <Box
                  width={"96%"}
                  h={"1px"}
                  bg={"gray.200"}
                  position={"absolute"}
                  left={"50%"}
                  transform={"translateX(-50%)"}
                  bottom={"0"}
                ></Box>
              </Checkbox>
            ))}
          </VStack>
        </Box>
        {todos.length > 0 ? (
          <AlertDialog isOpen={isOpen}>
            <AlertDialogContent
              w={"390px"}
              boxShadow={"1px 1px 5px 1px #d0d6f2"}
            >
              <AlertDialogHeader>삭제 확인</AlertDialogHeader>

              <AlertDialogBody>정말 삭제 하시겠습니까?</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  mr={"10px"}
                  onClick={() => {
                    onClose();
                    onClickAllDelete();
                  }}
                >
                  삭제
                </Button>
                <Button ref={cancelRef} onClick={onClose} marginRight={"10px"}>
                  취소
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default App;
