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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import React from "react";

const App = () => {
  const [todos, settodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentId, setcurrentId] = useState();
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

  const onClickDelete = (id) => {
    settodos(todos.filter((todo) => todo.id !== id));
  };
  const onClickAllDelete = () => {
    const todosDataid = todos.filter((data) => (data.finish ? data.id : ""));
    const overlap = todosDataid.map((adata) => adata.id);
    settodos(todos.filter((todo) => !overlap.includes(todo.id)));
  };

  const a = todos;
  console.log(a);
  return (
    <>
      <Container
        maxW={"450px"}
        w={"100%"}
        minH={"100vh"}
        bg={"white"}
        alignItems={"center"}
        borderRadius={"20px"}
        padding={"0 30px"}
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
                  <h2 style={{ fontSize: "20px", color: "black" }}>
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
          <Text
            w={"50px"}
            // border={"2px solid #d0d6f2"}
            bg={"#ff2020"}
            borderRadius={"5px"}
            marginTop={"10px"}
            fontWeight={"900"}
            cursor={"pointer"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"14px"}
            color={"white"}
            onClick={() => {
              onOpen();
            }}
          >
            삭제
          </Text>
        ) : (
          <Text
            w={"50px"}
            bg={"#ff2020"}
            borderRadius={"5px"}
            marginTop={"10px"}
            fontWeight={"900"}
            cursor={"pointer"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"14px"}
            color={"white"}
            onClick={() => {
              toast({
                title: "삭제할수 없습니다.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            삭제
          </Text>
        )}

        <Box paddingBottom={"20px"} mt={"40px"}>
          <VStack h={"100%"}>
            {todos.map((data) => (
              <Checkbox
                className="trueCheck"
                key={data.id}
                w={"100%"}
                bg={"white"}
                size={"lg"}
                h={"50px"}
                p={"15px"}
                mt={"10px"}
                isChecked={data.finish}
                onChange={() => onChangeCheck(data.id)}
                position={"relative"}
                boxShadow={"1px 1px 5px 1px #d0d6f2"}
              >
                <Flex transition={"1s"}>
                  <Box fontSize={"16px"} fontWeight={"700"}>
                    <Text
                      as={data.finish ? "s" : ""}
                      color={data.finish ? "gray.400" : ""}
                    >
                      {data.text}
                    </Text>
                  </Box>
                  <Box
                    h={"100%"}
                    position={"absolute"}
                    top={"0"}
                    right={"30px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <DeleteIcon
                      opacity={"0.7"}
                      onClick={() => {
                        onOpen();
                        setcurrentId(data.id);
                      }}
                    />
                  </Box>
                </Flex>
              </Checkbox>
            ))}
          </VStack>
        </Box>
        {todos.length > 0 ? (
          <AlertDialog isOpen={isOpen}>
            <AlertDialogContent w={"71%"} boxShadow={"1px 1px 5px 1px #d0d6f2"}>
              <AlertDialogHeader>삭제 확인</AlertDialogHeader>

              <AlertDialogBody>정말 삭제 하시겠습니까?</AlertDialogBody>

              {numdata ? (
                <AlertDialogFooter>
                  <Button
                    mr={"10px"}
                    onClick={() => {
                      // onClickDelete(currentId);
                      onClose();
                      onClickAllDelete();
                      toast({
                        title: "삭제할수없습니다",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    삭제
                  </Button>
                  <Button
                    ref={cancelRef}
                    onClick={onClose}
                    marginRight={"10px"}
                  >
                    취소
                  </Button>
                </AlertDialogFooter>
              ) : (
                <AlertDialogFooter>
                  <Button
                    mr={"10px"}
                    onClick={() => {
                      // onClickDelete(currentId);
                      onClose();
                      onClickAllDelete();
                      toast({
                        title: "삭제되었습니다",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    삭제
                  </Button>
                  <Button
                    ref={cancelRef}
                    onClick={onClose}
                    marginRight={"10px"}
                  >
                    취소
                  </Button>
                </AlertDialogFooter>
              )}
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
