import React from 'react'
import Modal from './Modal'
import Heading from '../Heading'
import Button from '../Button'
import Paragraph from '../Paragraph'
import FileReaderInput from 'react-file-reader-input'
import request from 'request'

import FileUploadIcon from 'react-icons/lib/md/file-upload'
import AddIcon from 'react-icons/lib/md/add-circle-outline'

import style from '../../libs/style.js'
import colors from '../../config/colors'
import { margins, fontSizes } from '../../config/scales'
import publicStyles from '../../config/styles.json'

class PublicStyle extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    thumbnailUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  }

  render() {
    return <div style={{
        verticalAlign: 'top',
        marginTop: margins[2],
        marginRight: margins[2],
        backgroundColor: colors.gray,
        display: 'inline-block',
        width: 180,
        fontSize: fontSizes[4],
        color: colors.lowgray,
    }}>
      <Button
        onClick={() => this.props.onSelect(this.props.url)}
        style={{
          backgroundColor: 'transparent',
          padding: margins[2],
          display: 'block',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <span style={{fontWeight: 700}}>{this.props.title}</span>
          <span style={{flexGrow: 1}} />
          <AddIcon />
        </div>
        <img
          style={{
            display: 'block',
            marginTop: margins[1],
            maxWidth: '100%',
          }}
          src={this.props.thumbnailUrl}
          alt={this.props.title}
        />
      </Button>
    </div>
  }
}

class OpenModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onOpenToggle: React.PropTypes.func.isRequired,
    onStyleOpen: React.PropTypes.func.isRequired,
  }

  onStyleSelect(styleUrl) {
    request({
      url: styleUrl,
      withCredentials: false,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const mapStyle = style.ensureStyleValidity(JSON.parse(body))
          console.log('Loaded style ', mapStyle.id)
          this.props.onStyleOpen(mapStyle)
        } else {
          console.warn('Could not open the style URL', styleUrl)
        }
    })
  }

  onUpload(_, files) {
    const [e, file] = files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      let mapStyle = JSON.parse(e.target.result)
      mapStyle = style.ensureStyleValidity(mapStyle)
      this.props.onStyleOpen(mapStyle);
    }
    reader.onerror = e => console.log(e.target);
  }

  render() {
    const styleOptions = publicStyles.map(style => {
      return <PublicStyle
        key={style.id}
        url={style.url}
        title={style.title}
        thumbnailUrl={style.thumbnail}
        onSelect={this.onStyleSelect.bind(this)}
      />
    })

    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      title={'Open Style'}
    >
      <Heading level={4}>Upload Style</Heading>
      <Paragraph>
        Upload a JSON style from your computer.
      </Paragraph>
      <FileReaderInput onChange={this.onUpload.bind(this)}>
        <Button>
          <FileUploadIcon />
          Upload
        </Button>
      </FileReaderInput>

      <Heading level={4}>Gallery Styles</Heading>
      <Paragraph>
        Open one of the publicly available styles to start from.
      </Paragraph>
      {styleOptions}
    </Modal>
  }
}

export default OpenModal
