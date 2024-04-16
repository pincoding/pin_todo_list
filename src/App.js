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
  const toast = useToast();
  const [btnDel, setbtnDel] = useState();
  const dateDate = new Date();

  const krDate = `${dateDate.getMonth() + 1}월${dateDate.getDate()}일`;
  // console.log(krDate);

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
    const k = todos.filter((data) => data.finish);
    setbtnDel(k);
  }, [todos]);

  const onClickDelete = (id) => {
    settodos(todos.filter((todo) => todo.id !== id));
  };
  const onClickAllDelete = () => {
    // settodos(todos.filter((data) => !a.includes(data.id)));
    // const a = todos.filter((data) => data.finish).map((data) => data.id);
    // console.log(a);
    // settodos(todos.filter((data) => !a.includes(data.id)));

    const a = todos.filter((data) => (data.finish ? data.id : ""));

    const b = a.map((adata) => adata.id);
    settodos(todos.filter((todo) => !b.includes(todo.id)));
  };
  console.log(todos);
  const arText = [];
  return (
    <>
      <Heading
        maxW={"450px"}
        w={"100%"}
        h={"40px"}
        position={"fixed"}
        bg={"#5a71da"}
        top={"0"}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <Box
          fontSize={"24px"}
          color={"white"}
          position={"absolute"}
          top={"50%"}
          right={"20px"}
          display={"flex"}
          transform={"translateY(-50%)"}
          cursor={"pointer"}
        >
          {/* <GrPowerReset onClick={() => listAllHandler(currentId)} /> */}
        </Box>
      </Heading>
      <Container
        maxW={"450px"}
        w={"100%"}
        minH={"100vh"}
        bg={"#6a85ff"}
        alignItems={"center"}
      >
        <Box w={"100%"}>
          <Heading fontSize={"22px"} padding={"20px 0px"}>
            <HStack w={"100%"} padding={"30px 0"}>
              <Box w={"100%"} display={"flex"}>
                <Box
                  w={"60%"}
                  color={"white"}
                  padding={"20px"}
                  lineHeight={"40px"}
                >
                  <h1 style={{ fontSize: "28px" }}>PinTodolist</h1>
                  <h2 style={{ fontSize: "16px" }}>Day {`${krDate}`}</h2>
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
            borderColor={"white"}
            sx={{ "::placeholder": { color: "black", opacity: "0.4" } }}
            type="text"
            placeholder="하루 계획 적어주세요."
          ></Input>
          <p style={{ marginLeft: "17px", color: "blue", fontSize: "14px" }}>
            {errors?.todo?.message}
          </p>
        </Box>
        <Text>{`List ${todos.length}`}</Text>
        {todos.length > 0 ? (
          <Button
            onClick={() => {
              onClickAllDelete();
              onOpen();
            }}
          >
            삭제
          </Button>
        ) : (
          <Button
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
          </Button>
        )}

        <Box paddingBottom={"20px"}>
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
                borderRadius={"10px"}
                isChecked={data.finish}
                onChange={() => onChangeCheck(data.id)}
                position={"relative"}
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
                  {/* <Box
                    h={"100%"}
                    position={"absolute"}
                    top={"0"}
                    right={"30px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <DeleteIcon
                      onClick={() => {
                        onOpen();
                        setcurrentId(data.id);
                      }}
                    />
                  </Box> */}
                </Flex>
              </Checkbox>
            ))}
          </VStack>
        </Box>
        {todos.length > 0 ? (
          <AlertDialog isOpen={isOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>삭제 확인</AlertDialogHeader>

              <AlertDialogBody>정말 삭제 하시겠습니까?</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  mr={"10px"}
                  onClick={() => {
                    // onClickDelete(currentId);
                    onClose();
                    toast({
                      title: btnDel ? "삭제되었습니다" : "삭제할수 없습니다",
                      status: btnDel ? "success" : "error",
                      duration: 3000,
                      isClosable: true,
                    });
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
