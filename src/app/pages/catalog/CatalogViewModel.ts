import { observable, computed } from "mobx";

export class CatalogViewModel {
    @observable
    colorPickerVisible = false

    @observable
    loading = false

    @observable
    msgStart = ''

    @observable
    msgEnd = ''

    @observable
    selectedColor = '#880e4f'

    @computed get lengthMsgStart(): number {
        return 144 - this.msgStart.length
    }

    @computed get lengthMsgEnd(): number {
        return 144 - this.msgEnd.length
    }
}