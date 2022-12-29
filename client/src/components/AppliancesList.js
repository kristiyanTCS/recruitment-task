import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { prop } from 'ramda'

import SortingControls from './SortingControls'

// Include the session cookie in every request
axios.defaults.withCredentials = true
const DATE_FORMAT = 'DD/MM/YYYY @ hh:mm'

function AppliancesList() {
  // Local state
  const [appliances, setAppliances] = useState([])
  const [order, setOrder] = useState('asc')
  const [sortBy, setSortBy] = useState('id')

  // Handlers
  const login = async () => {
    await axios.post(`http://localhost:4000/auth/signin`)
  }

  const handleReboot = async (applianceId) => {
    const { status } = await axios.patch(
      `http://localhost:4000/appliances/${applianceId}/reboot`
    )

    // If successful => updated local state
    if (status === 202)
      setAppliances([
        ...appliances.map((appliance) =>
          appliance.id !== applianceId
            ? appliance
            : { ...appliance, lastRebooted: new Date() }
        ),
      ])
  }
  const handleDelete = async (applianceId) => {
    const { status } = await axios.delete(
      `http://localhost:4000/appliances/${applianceId}`
    )

    // If successful => updated local state
    if (status === 204)
      setAppliances([
        ...appliances.filter((appliance) => appliance.id !== applianceId),
      ])
  }

  // Login initially to retrieve cookie for follow-up requests
  useEffect(() => {
    login()
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4000/appliances/list/${sortBy}/${order}`)
      .then((res) => {
        const { data: appliancesList } = res
        if (prop('length', appliancesList)) setAppliances(appliancesList)
      })
  }, [order, sortBy])

  return (
    <div className="appliances">
      <h1>Appliances</h1>

      <SortingControls
        order={order}
        setOrder={setOrder}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="appliances__list">
        {prop('length', appliances) ? (
          appliances.map((appliance) => (
            <div className="appliance" key={appliance.id}>
              <h3 className="appliance__name">{appliance.name}</h3>
              <div className="appliance__info">
                <p className="appliance__info__line">
                  <span className="appliance__info__line__name">Type:</span>
                  {appliance.type}
                </p>
                <p className="appliance__info__line">
                  <span className="appliance__info__line__name">ID:</span>
                  {appliance.id}
                </p>
                <p className="appliance__info__line">
                  <span className="appliance__info__line__name">
                    Creation date:
                  </span>
                  {dayjs(appliance.createdAt).format(DATE_FORMAT)}
                </p>
                <p className="appliance__info__line">
                  <span className="appliance__info__line__name">
                    Last rebooted:
                  </span>
                  {prop('lastRebooted', appliance)
                    ? dayjs(prop('lastRebooted', appliance)).format(DATE_FORMAT)
                    : 'N/A'}
                </p>
              </div>
              <div className="appliance__buttons">
                <button
                  className="appliance__button appliance__button--black"
                  onClick={() => handleReboot(appliance.id)}
                >
                  Reboot
                </button>
                <button
                  className="appliance__button appliance__button--red"
                  onClick={() => handleDelete(appliance.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="appliances__empty-message">
            There are no appliances available to you at the moment. Please try
            again later.
          </p>
        )}
      </div>
    </div>
  )
}

export default AppliancesList
