import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchPartner, selectPartner } from '../../store/partnerSlice'
import { fetchOrderStats, selectStats } from '../../store/orderSlice'
import Stats from "./components/Stats"
import { fetchUserDetails } from "../../store/authSlice"
import Loader from "../common/Loader/Loader"

const DashboardPage = () => {
  const dispatch = useDispatch()
  const { partner } = useSelector(selectPartner)
  const { isLoading, stat } = useSelector(selectStats)

  useEffect(() => {
    dispatch(fetchPartner())
    dispatch(fetchUserDetails())
  }, [dispatch])

  useEffect(() => {
    if (partner?._id) {
      dispatch(fetchOrderStats(partner?._id))
    }
  }, [dispatch, partner?._id])


  return <div>{isLoading ? <Loader /> : <Stats orderStats={stat} partner={partner} />}</div>
}


export default DashboardPage
