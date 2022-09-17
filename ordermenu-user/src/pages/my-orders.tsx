import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getAllOrders } from '../apis'
import { Container } from '../components'
import OrderTable from '../components/OrderTable'
import StatusRenderer from '../components/StatusRenderer'


const MyOrders = () => {
    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage
    } = useInfiniteQuery(['orders'], ({ pageParam = 1 }) => {
        return getAllOrders(pageParam)
    }, {
        getNextPageParam: (lastPage: any, pages: any) => {
            return lastPage?.page + 1 <= lastPage?.totalPages ? lastPage?.page + 1 : undefined
        }
    })

    const columns = useMemo(() => [
        {
            Header: 'Ordered On',
            accessor: 'createdAt',
            Cell: ({ value }) => {
                return `${new Date(value).toLocaleDateString() + ', ' + new Date(value).toLocaleTimeString()}`
            }

        },
        {
            Header: 'Total Amount',
            accessor: 'totalBillAmount'
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: (status) => {
                return <StatusRenderer status={status.value} />
            }
        },
        {
            Header: 'Table Number',
            accessor: 'tableNumber'
        }
    ], [])

    const orders = useMemo(() => data?.pages?.map(d => d?.results).flat(), [data?.pages])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{JSON.stringify(error)}</h2>
    }

    return (
        <Container mt={8}>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>My Orders</Text>
            {orders && <OrderTable columns={columns} data={orders} />}
            {hasNextPage && <Flex justify="center" mt={4}>
                <Button onClick={fetchNextPage} colorScheme="green" isLoading={isFetching && !isFetchingNextPage}>Load More</Button>
            </Flex>}
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </Container>
    )
}

export default MyOrders