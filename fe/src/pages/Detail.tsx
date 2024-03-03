import { Box, Button, Flex, Image, Input, Spacer, Text } from "@chakra-ui/react";
import { BiSolidCommentDetail } from "react-icons/bi";
// import { LuImagePlus } from "react-icons/lu";
import { useReplies } from "../features/thread/hooks/useReplies";
import { FaHeart } from "react-icons/fa";
import { useLike } from "../features/thread/hooks/useLike";
import { IReplies } from "../interface/IThread";
import { LuImagePlus } from "react-icons/lu";

const Detail = () => {
  const { threadDetail, replies, handleChange, HandlePostReply, fileInputRef } = useReplies();
  const { handleLike } = useLike();

  return (
    <>
      <Box bgColor="#1d1d1d" color="white" borderY={"1px solid grey"} m="0 auto" p="10px" w="100%">
        <Flex mb="15px" ml="6%">
          <Box mr="18px">
            <Image src={threadDetail?.user?.photo_profile} borderRadius="full" boxSize="40px" objectFit="cover" />
          </Box>

          <Box>
            <Flex gap="10px" alignItems="center" mb="10px">
              <Text>{threadDetail?.user?.full_name}</Text>
              <Text fontSize="xs" color="grey">
                @{threadDetail?.user?.username}
              </Text>
              <Text fontSize="xs" color="grey">
                {threadDetail?.created_at}
              </Text>
            </Flex>

            <Box>
              <Box mr="15px">
                <Text mb="10px">{threadDetail?.content}</Text>
                {threadDetail?.image && <Image src={threadDetail?.image} width="300px" height="300px" />}
              </Box>
              <Flex mt="10px" alignItems="center" gap="10px" color="grey">
                <Flex alignItems="center" gap="10px">
                  <Text onClick={() => handleLike(threadDetail?.id || 0, threadDetail?.isLiked || false)}>
                    <FaHeart color={threadDetail?.isLiked ? "red" : "grey"} />
                  </Text>
                  <Text>{threadDetail?.likes_count}</Text>
                </Flex>
                <Flex alignItems="center" cursor={"pointer"} gap="10px" color="grey">
                  <Text>
                    <BiSolidCommentDetail />
                  </Text>
                  <Text>{threadDetail?.replies_count} Replies</Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Flex alignItems={"center"} p={"15px 35px"} borderBottom={"1px solid grey"} w={"100%"}>
        <Image src={threadDetail?.user?.photo_profile} borderRadius="full" boxSize="40px" objectFit="cover" mr="10px" />
        <form onSubmit={HandlePostReply} encType="multipart/form-data">
          <Flex alignItems={"center"}>
            <Input name="image" id="image-upload" type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleChange} />

            <Input w={"400px"} m={"0 10px 0 10px"} variant={"unstyled"} color="white" placeholder="Type your reply!" id="content" name="content" onChange={handleChange} />

            <Spacer />

            <label htmlFor="image-upload">
              <LuImagePlus fontSize="30px" color="green" />
            </label>

            <Button bgColor={"green"} color={"white"} ml="10px" type="submit">
              Reply
            </Button>
          </Flex>
        </form>
      </Flex>
      <Box>
        {replies?.replies?.map((replies: IReplies, index: number) => {
          return (
            <Box bgColor="#1d1d1d" color="white" borderY={"1px solid grey"} m="0 auto" p="10px" w="100%" key={index}>
              <Flex mb="15px" ml="6%">
                <Box mr="18px">
                  <Image src={replies?.user?.photo_profile} borderRadius="full" boxSize="40px" objectFit="cover" />
                </Box>

                <Box>
                  <Flex gap="10px" alignItems="center" mb="10px">
                    <Text>{replies?.user?.full_name}</Text>
                    <Text fontSize="xs" color="grey">
                      @{replies?.user?.username}
                    </Text>
                    <Text fontSize="xs" color="grey">
                      {replies?.created_at}
                    </Text>
                  </Flex>

                  <Box>
                    <Box mr="15px">
                      <Text mb="10px">{replies?.content}</Text>
                      {replies?.image && <Image src={replies?.image} width="300px" height="300px" />}
                    </Box>
                    <Flex mt="10px" alignItems="center" gap="10px" color="grey">
                      <Flex alignItems="center" gap="10px">
                        <Text>
                          <FaHeart />
                        </Text>
                        <Text>{replies.likes_count}</Text>
                      </Flex>
                      <Flex alignItems="center" cursor={"pointer"} gap="10px" color="grey">
                        <Text>
                          <BiSolidCommentDetail />
                        </Text>
                        <Text>Replies</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Detail;
