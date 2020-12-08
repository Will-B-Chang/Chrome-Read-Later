import '../../modules/prototype.mjs'
import * as readingList from '../../features/reading-list/readingList.mjs'
import * as statusBar from '../../features/status-bar/statusBar.js'

$(async () => {
  await readingList.setup()
  statusBar.setup()
})
