const React = require('react');
const RepoSearch = require('./RepoSearch');
const RepoEntry = require('./RepoEntry');
const Repos = require('../js/repos');

class RepoList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      reposToRender: [],
      sortedBy: 'default'
    };
    
    this.getRepos = this.getRepos.bind(this);
    
  }
  
  getRepos(searchTerm, language, filterBy){
    //Fetch repos;
    //refactor to exclude 'self/this' with es6 syntax?
    var self = this;
    Repos.getRepos(function(data) {
      if(filterBy){
        switch(filterBy){
          case 'Popularity':
            data = data.sort((a,b) => b.stargazers_count-a.stargazers_count);
            break;
          case 'Tickets':
            data = data.sort((a,b) => b.beginner_tickets-a.beginner_tickets);
            break;
          case 'Forks':
            data = data.sort((a,b) => b.forks-a.forks);
            break;
        }
        self.setState({sortedBy: filterBy})
      }
      self.setState({
        numberOfRepos: data.length,
        reposToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the repo list
    $('.main-repo-view')[0].scrollTop = 0;
  }
  
  componentDidMount () {
    this.getRepos();
  }
  
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div >
      <RepoSearch searchHandler={this.getRepos} />
      <h4>{this.state.numberOfRepos} Repos with easy issues - sorted by {this.state.sortedBy.toLowerCase()}</h4>
      <div className="main-repo-view">
        {this.state.reposToRender.map ((repo, index) => 
          <RepoEntry data={repo} username={this.props.username} key={index} refreshUserInfo={this.props.refreshUserInfo} />
        )}
      </div>
    </div>
    );  
  }
  
}

module.exports = RepoList;