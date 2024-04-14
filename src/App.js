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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";

const App = () => {
  const [todos, settodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentId, setcurrentId] = useState();
  const toast = useToast();
  const [topData, setTopData] = useState(false);
  const dateDate = new Date();

  const krDate = `${dateDate.getMonth() + 1}월${dateDate.getDate()}일`;
  console.log(krDate);

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
  });

  const onClickDelete = (id) => {
    settodos(todos.filter((todo) => todo.id !== id));
    setTopData(false);
  };

  const listAllHandler = (id) => {
    settodos(todos.filter((todo) => todo.id === id));
  };

  // const onClickTopData = (id) => {
  //   setTopData(todos.filter((top) => top.id === id && false));
  // };

  // console.log(todos.map((data) => data.id));
  // console.log(topData);
  // console.log();
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
          <GrPowerReset onClick={() => listAllHandler(currentId)} />
        </Box>
      </Heading>
      <Container
        maxW={"450px"}
        w={"100%"}
        h={"100vh"}
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
              required: {
                message: "한글자 이상 입력해주세요.",
              },
              minLength: {
                message: "2글자 이상입력하세요",
                value: 2,
              },
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

        <Box>
          <VStack>
            {todos.map((data) => (
              <Checkbox
                key={data.id}
                w={"100%"}
                // bg={"#5a71da"}
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
                    {data.text}
                    {console.log(data.text)}
                    {/* <Box
                      width={"100%"}
                      h={"1px"}
                      bg={"gray"}
                      position={"relative"}
                      bottom={"50%"}
                      opacity={"1"}
                    ></Box> */}
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
        <AlertDialog isOpen={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>삭제 확인</AlertDialogHeader>

            <AlertDialogBody>정말 삭제 하시겠습니까?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} marginRight={"10px"}>
                취소
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onClickDelete(currentId);
                  toast({
                    title: "삭제되었습니다",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </>
  );
};

export default App;
