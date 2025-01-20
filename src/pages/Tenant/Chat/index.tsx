import { HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useRef, useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import axios from 'axios';
import { BASE_API } from '../../../utils/constant/api';

const Index = () => {
  const token = localStorage.getItem('token');
  const [chats, setChats] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const chatEndRef = useRef<any>(null);

  // Fetch chat list
  const fetchChats = async () => {
    try {
      const response = await axios.get(`${BASE_API}/chat/list-chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Replace with your API URL
      setChats(response.data); // Update with actual response structure
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };

  // Fetch chat details
  const fetchChatDetail = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_API}/chat/chat-detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Replace with your API URL
      // Handle the response data (if it should replace or add to current chats)
      console.log(response.data); // Adjust logic to display detailed chat
    } catch (error) {
      console.error('Failed to fetch chat detail:', error);
    }
  };

  // Scroll to bottom when chats update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
    fetchChatDetail();
  }, []);

  // Submit chat
  const submit = () => {
    setChats((prev: any) => [
      ...prev,
      {
        subject: true,
        message: chatInput,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        status: 'Delivered',
      },
    ]);
    setChatInput('');
  };

  return (
    <Stack width={'100%'}>
      <Stack
        width={'100%'}
        maxWidth={'700px'}
        backgroundColor={'rgba(239, 239, 239, 1)'}
        borderRadius={'30px'}
        margin={'auto'}
      >
        <HStack
          paddingX={'20px'}
          width={'100%'}
          borderTopRadius={'30px'}
          height={'74px'}
          justifyContent={'space-between'}
        >
          <HStack>
            <Image
              src={'https://avatars.githubusercontent.com/u/177474254?v=4'}
              width={'52px'}
              height={'52px'}
              objectFit={'cover'}
              borderRadius={'100%'}
            />
            <Stack gap={'0px'}>
              <Text>Bu Dini</Text>
              <HStack>
                <Stack
                  borderRadius={'100%'}
                  width={'8px'}
                  height={'8px'}
                  backgroundColor={'rgba(12, 147, 0, 1)'}
                ></Stack>
                <Text fontSize={'12px'}>Sedang Online</Text>
              </HStack>
            </Stack>
          </HStack>

          <HStack
            fontSize={'22px'}
            color={'rgba(197, 142, 36, 1)'}
            gap={'15px'}
          >
            <IoSearchOutline style={{ cursor: 'pointer' }} />
            <IoIosInformationCircleOutline style={{ cursor: 'pointer' }} />
            <RxHamburgerMenu style={{ cursor: 'pointer' }} />
          </HStack>
        </HStack>

        <Stack gap={'20px'} overflowY={'auto'} height={'calc(100vh - 6.5cm)'}>
          {chats.map((i: any, index: number) => (
            <HStack
              key={index}
              width={'100%'}
              paddingX={'20px'}
              justifyContent={i.subject ? 'flex-end' : 'flex-start'}
            >
              <HStack
                fontSize={'12px'}
                flexDirection={i.subject ? 'row' : 'row-reverse'}
              >
                <Stack
                  color={'rgba(96, 90, 90, 1)'}
                  gap={'0px'}
                  alignItems={'flex-end'}
                >
                  <Text>{i.status}</Text>
                  <Text>{i.time}</Text>
                </Stack>
                <Stack
                  width={'auto'}
                  backgroundColor={
                    i.subject ? 'rgba(197, 142, 36, 1)' : 'black'
                  }
                  borderRadius={'16px'}
                  color={'white'}
                  padding={'10px'}
                >
                  <Text margin={'auto'}>{i.message}</Text>
                </Stack>
              </HStack>
            </HStack>
          ))}
          <div ref={chatEndRef}></div>
        </Stack>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <HStack
            borderBottomRadius={'30px'}
            justifyContent={'space-between'}
            width={'100%'}
            backgroundColor={'rgba(239, 239, 239, 1)'}
            paddingX={'20px'}
            paddingBottom={'16px'}
          >
            <Input
              backgroundColor={'rgba(217, 217, 217, 1)'}
              placeholder="Cari Properti"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              borderRadius={'32px'}
            />
            {chatInput ? (
              <Stack
                height={'2.5rem'}
                width={'2.5rem'}
                cursor={'pointer'}
                backgroundColor={'rgba(217, 217, 217, 1)'}
                _hover={{ backgroundColor: '#E2E8F0' }}
                fontSize={'16px'}
                color={'rgba(153, 145, 145, 1)'}
                borderRadius={'100%'}
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <LuSendHorizonal style={{ margin: 'auto' }} />
              </Stack>
            ) : null}
          </HStack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Index;
