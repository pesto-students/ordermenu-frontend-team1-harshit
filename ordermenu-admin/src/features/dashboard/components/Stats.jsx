import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMemo } from 'react';


function StatsCard(props) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function Stats({ orderStats, partner }) {

  const stats = useMemo(() => {
    return {
      totalCategories: partner.categories.length,
      totalProducts: partner.menu.length,
      totalTables: partner.tables.length
    }
  }, [partner])

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'left'}
        fontSize={'2xl'}
        pb={6}
        fontWeight={'bold'}>
        Welcome Back
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'All Orders'} stat={orderStats?.totalOrders} />
        <StatsCard title={'Pending Orders'} stat={orderStats?.pendingOrders} />
        <StatsCard title={'Accepted Orders'} stat={orderStats?.acceptedOrders} />
        <StatsCard title={'Completed Orders'} stat={orderStats?.completedOrders} />

        <StatsCard title={'Categories'} stat={stats?.totalCategories} />
        <StatsCard title={'Products'} stat={stats?.totalProducts} />
        <StatsCard title={'Tables'} stat={stats.totalTables} />
      </SimpleGrid>
    </Box>
  );
}