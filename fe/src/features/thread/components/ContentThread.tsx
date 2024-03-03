import { Box, Image, Text, Flex, Avatar } from "@chakra-ui/react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThreadInterface } from "../../../interface/IThread";
import { useThreads } from "../hooks/useThread";
import { FaHeart } from "react-icons/fa";
import { useLike } from "../hooks/useLike";

const ContentThead = () => {
  const navigate = useNavigate();
  const { threads } = useThreads();
  const { handleLike } = useLike();

  return (
    <>
      <Box>
        {threads.threads.map((thread: ThreadInterface, index: number) => (
          <Box key={index} bgColor="#1d1d1d" color="white" borderY={"1px solid grey"} m="0 auto" p="10px" w="100%">
            <Flex mb="15px" ml="6%">
              <Box mr="18px">
                <Avatar src={thread.user?.photo_profile} borderRadius="full" boxSize="40px" objectFit="cover" />
              </Box>

              <Box>
                <Flex gap="10px" alignItems="center" mb="10px">
                  <Text>{thread.user?.full_name}</Text>
                  <Text fontSize="xs" color="grey">
                    @{thread.user?.username}
                  </Text>
                  <Text fontSize="xs" color="grey">
                    {new Date(thread.created_at).toLocaleString()}
                  </Text>
                </Flex>

                <Box>
                  <Box mr="15px">
                    <Text mb="10px">{thread.content}</Text>
                    {thread.image && <Image src={thread.image} width="300px" height="300px" />}
                  </Box>
                  <Flex mt="10px" alignItems="center" gap="10px" color="grey">
                    <Flex alignItems="center" gap="10px">
                      <Text onClick={() => handleLike(thread.id, thread.isLiked)}>
                        <FaHeart color={thread.isLiked ? "red" : "grey"} />
                      </Text>
                      <Text>{thread.likes_count}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="10px" color="grey" onClick={() => navigate(`/threads/${thread.id}`)} cursor={"pointer"}>
                      <Text>
                        <BiSolidCommentDetail />
                      </Text>
                      <Text>{thread.replies_count} Replies</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default ContentThead;

// const ContentThread = () => {
// const [thread, setThread] = useState<ThreadInterface[]>([]);
// const token = localStorage.getItem("token");
// const getData = async () => {
//   const response = await axiosInstance.get("/threads", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   setThread(response.data.data);
// };

// useEffect(() => {
//   getData();
// }, []);
// const navigate = useNavigate();

// const { threads, isLoading, error } = useThreads();

//   return (
//     <>
//       {
//         error && (
//           <Box>
//             <Text color={'white'}>Gagal memuat data</Text>
//           </Box>
//       )}

//       {
//         isLoading ?
//         (
//         <Box>
//           <Text color={'white'}>Loading...</Text>
//           </Box>
//         ) : (
//         <Box>
//           {threads?.map((thread: ThreadInterface, index: number) => (
//             <Box key={index} bgColor="#1d1d1d" color="white" borderY={"1px solid grey"} m="0 auto" p="10px" w="100%">
//               <Flex mb="15px" ml="6%">
//                 <Box mr="18px">
//                   <Image src={thread.user.photo_profile} borderRadius="full" boxSize="40px" objectFit="cover" />
//                 </Box>

//                 <Box>
//                   <Flex gap="10px" alignItems="center" mb="10px">
//                     <Text>{thread.user.full_name}</Text>
//                     <Text fontSize="xs" color="grey">
//                       @{thread.user.username}
//                     </Text>
//                     <Text fontSize="xs" color="grey">
//                       {new Date(thread.created_at).toLocaleString()}
//                     </Text>
//                   </Flex>

//                   <Box>
//                     <Box mr="15px">
//                       <Text mb="10px">{thread.content}</Text>
//                       {thread.image && <Image src={thread.image} width="300px" height="300px" />}
//                     </Box>
//                     <Flex mt="10px" alignItems="center" gap="10px" color="grey">
//                       <LikesButton likes={thread.likes_count} />
//                       <Flex alignItems="center" gap="10px" color="grey" onClick={() => navigate(`/threads/${thread.id}`)} cursor={"pointer"}>
//                         <Text>
//                           <BiSolidCommentDetail />
//                         </Text>
//                         <Text>{thread.replies_count} Replies</Text>
//                       </Flex>
//                     </Flex>
//                   </Box>
//                 </Box>
//               </Flex>
//             </Box>
//           ))}
//         </Box>)
//       }
//     </>
//   );
// };

// export default ContentThread;
