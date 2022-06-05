import React, { useState, useEffect } from "react";

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  Alert,
  Input
} from "native-base";

import axios from "axios";

const Homepage = () => {
  const [message, setMessage] = useState();
  const [data, setData] = useState({
    nama_hutang: "",
    jumlah: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      nama_hutang: e.target.value,
      jumlah:e.target.value
    });
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      ...data,
      status: "hutang",
    };

    console.log("ini adalah data :", user);

    const sendPostRequest = async () => {
      try {
        const resp = await axios.post(
          "https://api.kontenbase.com/query/api/v1/940aa1de-d88b-4d99-adab-4d337c7ed1ff/hutang",
          user
        );
        console.log(resp.data);
        if (resp) {
          setMessage(<Alert color="coolGray.800">data Added</Alert>);
          location.reload();
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendPostRequest();
  };

  return (
    <Box
      safeArea
      bg="primary.200"
      
      px={10}
      w="100%"
      height="100vh"
      mx="auto"
      justifyContent="center"
    >
     {message}
      <Heading textAlign="center" size="lg" color="primary.500">
        Debt Manager
      </Heading>

      <FormControl space={2} mt={5}>
        <VStack mt={2}>
          <Input
            variant="rounded"
            size="md"
            type="text"
            placeholder="Nama Hutang"
            onChange={e => {
              setData({ ...data, nama_hutang: e.target.value} )
              // console.log(data);
            }}
          />
        </VStack>
        <VStack mb={5} mt={3}>
          <Input
            variant="rounded"
            size="md"
            keyboardType="number-pad"
            placeholder="Jumlah Nominal"
            name="jumlah"
            onChange={e => {
              setData({ ...data, jumlah: e.target.value} )
              // console.log(data);
            }}
            value={data.jumlah}
          />
        </VStack>

        <VStack space={2}>
          <Button
            type="submit"
            onPress={handleSubmit}
            colorScheme="cyan"
            _text={{ color: "white" }}
          >
            Tambah
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default Homepage;
