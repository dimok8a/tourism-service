import {makeAutoObservable} from "mobx";

export default class PlaceStore {
    constructor() {
        this._placeTypes = []
        this._places = []

        this._selectedType = {}
        makeAutoObservable(this)
    }

    setPlaceTypes(placeTypes)
    {
        this._placeTypes = placeTypes
    }

    setPlaces(places)
    {
        this._places = places
    }

    setSelectedType(selectedType)
    {
        this._selectedType = selectedType
    }

    get placeTypes()
    {
        return this._placeTypes
    }

    get places()
    {
        return this._places
    }

    get selectedType()
    {
        return this._selectedType
    }
}
