import React from 'react'
import HomeImage from '../components/HomeImage'
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Progress,
  Text,
  Center,
  Input,
  Textarea,
  Link,
  Button,
} from '@chakra-ui/react'

function RestauratDetails() {
  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Restaurant Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={5}>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Name"}
          </Text>
          <Input type="text" placeholder="Yolo Cafe" bg="white" mb={4} />
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Tagline"}
          </Text>
          <Input
            type="text"
            placeholder="You only live once"
            bg="white"
            mb={4}
          />
        </GridItem>
      </Grid>
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Location"}
      </Text>
      <Input
        type="text"
        placeholder="48, Scheme No. 54, Indore, Madhya Pradesh, India"
        bg="white"
        mb={9}
      />
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Description"}
      </Text>
      <Textarea
        placeholder="This particular coffee shop is not a cafe, it's a coffee shop literally. They sell the finest coffee from all over the world."
        bg="white"
        mb={6}
        resize={'none'}
      />
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={4}>
        <GridItem>
          <Link
            color={'green.400'}
            fontSize="md"
            fontWeight="medium"
            mt={8}
            href="/login"
          >
            Already have a account
          </Link>
        </GridItem>
        <GridItem alignContent="center">
          <Button
            bg={'green.400'}
            color={'white'}
            width="70%"
            _hover={{ bg: 'green.300' }}
          >
            {'Next ->'}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

function OwnerDetails() {
  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Owner Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={5}>
        <GridItem mr={6} mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {'First Name'}
          </Text>
          <Input type="text" placeholder="John" bg="white" mb={4} />
        </GridItem>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {'Last Name'}
          </Text>
          <Input type="text" placeholder="Doe" bg="white" mb={4} />
        </GridItem>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {'Phone Number'}
          </Text>
          <Input type="number" placeholder="+91 8989475133" bg="white" mb={4} />
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {'Email'}
          </Text>
          <Input
            type="email"
            placeholder="hello@yolocafe.in"
            bg="white"
            mb={4}
          />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={7}>
        <GridItem></GridItem>
        <GridItem alignContent="center" ml={12}>
          <Button
            bg={'green.400'}
            color={'white'}
            width="70%"
            _hover={{ bg: 'green.300' }}
          >
            {'Next ->'}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

export default function Register() {
  return (
    <HomeImage>
      <Center>
        <Box mt="10vh" width={['85vw', '85vw', '45vw', '45vw', '45vw', '40vw']}>
          <Heading as="h2" size="lg" mb={10}>
            Partner with us
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={0} mb={5}>
            <GridItem>
              <Progress
                colorScheme="green"
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem ml={6}>
              <Progress
                colorScheme="green"
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem ml={6}>
              <Progress
                colorScheme="green"
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Restaurant Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
            <GridItem ml={6} mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Owner Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
            <GridItem ml={6} mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Restaurant Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
          </Grid>

          {false && <RestauratDetails />}
          {true && <OwnerDetails />}
        </Box>
      </Center>
    </HomeImage>
  )
}
