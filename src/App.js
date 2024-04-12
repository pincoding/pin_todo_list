import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const [todoData, setTodoData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    // setTodoData(data);
    // console.log(typeof todoData);
    const { todo } = data;
    setTodoData(todo);
  };
  console.log(todoData);
  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      h={"100vh"}
      bg={"white"}
      alignItems={"center"}
    >
      <Box w={"100%"}>
        <Heading fontSize={"22px"} padding={"20px 20px"} bg={"gray"}>
          <HStack w={"100%"} padding={"30px 0"} bg={"blue"}>
            <Box w={"100%"} display={"flex"}>
              <Box w={"60%"} bg={"yellow"} padding={"20px"} lineHeight={"40px"}>
                <h2 style={{}}>Day 04-12</h2>
                <p>5-ist</p>
              </Box>
              <Box
                w={"40%"}
                bg={"red"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Button borderRadius={"50%"} bg={"#5b74e2"} color={"white"}>
                  <AddIcon />
                </Button>
              </Box>
            </Box>
          </HStack>
        </Heading>
      </Box>
      <Box as="form" onSubmit={handleSubmit(submitHandler)}>
        <Input
          {...register("todo", {
            required: {
              message: "아무것도 입력되지 않았습니다.",
            },
          })}
          borderColor={"gray.500"}
          type="text"
          placeholder="하루 계획 적어주세요."
        ></Input>
      </Box>
    </Container>
  );
};

export default App;
